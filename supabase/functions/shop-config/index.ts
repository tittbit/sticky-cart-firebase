
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-shop-domain',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const shopDomain = url.searchParams.get('shop') || req.headers.get('x-shop-domain');
    
    if (!shopDomain) {
      return new Response(JSON.stringify({ error: 'Shop domain is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'GET') {
      const { data: config, error } = await supabase
        .from('shop_configurations')
        .select('*')
        .eq('shop_domain', shopDomain)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const defaultConfig = { cartDrawerEnabled: true, stickyButtonEnabled: true, drawerPosition: 'right', themeColor: '#000000', stickyButtonText: 'Cart', stickyButtonPosition: 'bottom-right', freeShippingEnabled: false, freeShippingThreshold: 50, upsellsEnabled: false, addOnsEnabled: false, discountBarEnabled: false, announcementText: '', discountCode: '' };
      const rawSettings = config ? { ...defaultConfig, ...(config.settings || {}) } : defaultConfig;

      const normalized = {
        cartDrawerEnabled: rawSettings.cartDrawerEnabled ?? rawSettings.enabled ?? true,
        drawerPosition: rawSettings.drawerPosition || rawSettings.cartDrawerPosition || 'right',
        themeColor: rawSettings.themeColor || '#000000',
        stickyButtonEnabled: rawSettings.stickyButtonEnabled ?? rawSettings.stickyButton?.enabled ?? true,
        stickyButtonText: rawSettings.stickyButtonText || rawSettings.buttonText || rawSettings.stickyButton?.text || 'Cart',
        stickyButtonPosition: rawSettings.stickyButtonPosition || rawSettings.buttonPosition || rawSettings.stickyButton?.position || 'bottom-right',
        freeShippingEnabled: rawSettings.freeShippingEnabled ?? rawSettings.freeShippingBarEnabled ?? rawSettings.freeShipping?.enabled ?? false,
        freeShippingThreshold: Number(rawSettings.freeShippingThreshold ?? rawSettings.freeShipping?.threshold ?? 50),
        upsellsEnabled: rawSettings.upsellsEnabled ?? rawSettings.upsells?.enabled ?? false,
        addOnsEnabled: rawSettings.addOnsEnabled ?? rawSettings.addOns?.enabled ?? false,
        discountBarEnabled: rawSettings.discountBarEnabled ?? rawSettings.discountPromoEnabled ?? rawSettings.discountBar?.enabled ?? false,
        announcementText: rawSettings.announcementText || '',
        discountCode: rawSettings.discountCode || '',
        googleAnalyticsId: rawSettings.googleAnalyticsId || '',
        facebookPixelId: rawSettings.facebookPixelId || ''
      };

      let upsellProducts = [];
      if (normalized.upsellsEnabled) {
        const { data: upsells } = await supabase.from('upsell_products').select('*').eq('shop_domain', shopDomain).eq('is_active', true).order('display_order', { ascending: true });
        upsellProducts = upsells || [];
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        settings: normalized,
        upsellProducts,
        subscription: { status: config?.subscription_status || 'trial', plan: config?.subscription_plan || 'starter', trialEndsAt: config?.trial_ends_at }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (req.method === 'POST') {
      const { settings } = await req.json();
      if (!settings) {
        return new Response(JSON.stringify({ error: 'Settings are required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const { data: shopData, error: shopError } = await supabase
        .from('shop_configurations')
        .select('access_token, shop_domain')
        .eq('shop_domain', shopDomain)
        .single();

      if (shopError || !shopData?.access_token) {
        return new Response(JSON.stringify({ error: 'Shop not found or access token missing' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      const accessToken = shopData.access_token;

      const [upsellsResult, addonsResult] = await Promise.all([
        supabase.from('upsell_products').select('*').eq('shop_domain', shopDomain).eq('is_active', true).order('display_order'),
        supabase.from('addon_products').select('*').eq('shop_domain', shopDomain).eq('is_active', true).order('display_order')
      ]);

      const normalizedSettings = {
        cartDrawerEnabled: settings.cartDrawerEnabled !== false,
        drawerPosition: settings.drawerPosition || 'right',
        themeColor: settings.themeColor || '#3B82F6',
        stickyButton: {
          enabled: settings.stickyButtonEnabled !== false,
          text: settings.stickyButtonText || 'Cart',
          position: settings.stickyButtonPosition || 'bottom-right'
        },
        freeShipping: {
          enabled: settings.freeShippingEnabled === true,
          threshold: settings.freeShippingThreshold || 50
        },
        upsells: { enabled: settings.upsellsEnabled === true },
        addOns: { enabled: settings.addOnsEnabled === true },
        discountBar: {
          enabled: settings.discountBarEnabled === true,
          code: settings.discountCode || ''
        },
        announcementText: settings.announcementText || '',
        currency: settings.currency || 'USD'
      };

      const settingsJS = `
// Auto-generated cart settings - Do not edit manually - ${new Date().toISOString()}
window.STICKY_CART_SETTINGS = ${JSON.stringify(normalizedSettings, null, 2)};
window.STICKY_CART_UPSELLS = ${JSON.stringify(upsellsResult.data || [], null, 2)};
window.STICKY_CART_ADDONS = ${JSON.stringify(addonsResult.data || [], null, 2)};
console.log('[Sticky Cart] Settings loaded from theme asset.');
`;

      const themesResponse = await fetch(`https://${shopDomain}/admin/api/2025-10/themes.json`, {
        headers: { 'X-Shopify-Access-Token': accessToken }
      });
      if (!themesResponse.ok) throw new Error('Failed to fetch themes');
      const { themes } = await themesResponse.json();
      const mainTheme = themes.find(t => t.role === 'main');
      if (!mainTheme) throw new Error('Could not find main theme');
      
      const assetKey = 'assets/sticky-cart-settings.js';
      const assetResponse = await fetch(`https://${shopDomain}/admin/api/2025-10/themes/${mainTheme.id}/assets.json`, {
        method: 'PUT',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ asset: { key: assetKey, value: settingsJS } })
      });

      if (!assetResponse.ok) {
        const errorBody = await assetResponse.text();
        throw new Error(`Failed to upload settings to theme: ${errorBody}`);
      }
      
      return new Response(JSON.stringify({ success: true, message: 'Configuration saved and published to theme.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in shop-config function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error: ' + error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
