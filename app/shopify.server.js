import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ admin, session }) => {
      // Create script tag on installation
      await createScriptTag(admin);
      // Initialize default settings
      await initializeDefaultSettings(session.shop);
    },
  },
});

async function createScriptTag(admin) {
  try {
    const scriptTag = new admin.rest.resources.ScriptTag({ session: admin.session });
    scriptTag.event = "onload";
    scriptTag.src = `${process.env.SHOPIFY_APP_URL}/cart-drawer.js`;
    scriptTag.display_scope = "all";
    await scriptTag.save({
      update: true,
    });
    console.log("Script tag created successfully");
  } catch (error) {
    console.error("Error creating script tag:", error);
  }
}

async function initializeDefaultSettings(shopDomain) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.warn('Supabase credentials not found, skipping settings initialization');
      return;
    }
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const defaultSettings = {
      cartEnabled: true,
      drawerPosition: 'right',
      themeColor: '#000000',
      stickyButtonEnabled: true,
      stickyButtonText: 'Cart',
      stickyButtonPosition: 'bottom-right',
      upsellsEnabled: false,
      upsellProducts: [],
      addOnsEnabled: false,
      addOnProducts: [],
      freeShippingEnabled: false,
      freeShippingThreshold: 50,
      discountEnabled: false,
      discountCode: '',
      announcementEnabled: false,
      announcementText: '',
      fbPixelId: '',
      googleAdsId: '',
    };

    const { error } = await supabase
      .from('shop_settings')
      .upsert({ 
        shop_domain: shopDomain, 
        settings: defaultSettings,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error initializing default settings:', error);
    } else {
      console.log('Default settings initialized for shop:', shopDomain);
    }
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}

export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;