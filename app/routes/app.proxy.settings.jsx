import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get('shop');
  
  if (!shopDomain) {
    return json({ error: 'Shop parameter is required' }, { status: 400 });
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from('shop_settings')
      .select('settings, updated_at')
      .eq('shop_domain', shopDomain)
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return json({ error: 'Settings not found' }, { status: 404 });
    }

    return json({
      settings: data.settings,
      lastUpdated: data.updated_at,
      success: true
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    return json({ error: 'Database connection failed' }, { status: 500 });
  }
};

export const action = async ({ request }) => {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return json({ error: 'Method not allowed' }, { status: 405 });
};