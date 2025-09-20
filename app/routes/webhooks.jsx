import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { topic, shop, session } = await authenticate.webhook(request);

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      
      // Clean up Supabase data
      try {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
          console.warn('Supabase credentials not found, skipping cleanup');
          break;
        }
        
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_KEY
        );

        await supabase
          .from('shop_settings')
          .delete()
          .eq('shop_domain', shop);
          
        console.log(`Cleaned up data for uninstalled shop: ${shop}`);
      } catch (error) {
        console.error('Error cleaning up Supabase data:', error);
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};