import { useState, useCallback, useEffect } from "react";
import { useLoaderData, useSubmit, useNavigation } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  Layout,
  Page,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Checkbox,
  TextField,
  Select,
  ResourcePicker,
  ColorPicker,
  Divider,
  Banner,
  Frame,
  Modal,
  Badge,
} from "@shopify/polaris";
import { useState as usePolaris } from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  // Load current settings from Supabase
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from('shop_settings')
      .select('settings')
      .eq('shop_domain', session.shop)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading settings:', error);
      return { settings: null, error: error.message };
    }

    return { 
      settings: data?.settings || null,
      shopDomain: session.shop,
      error: null 
    };
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return { settings: null, error: 'Database connection failed' };
  }
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const settings = JSON.parse(formData.get("settings"));

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { error } = await supabase
      .from('shop_settings')
      .upsert({ 
        shop_domain: session.shop, 
        settings: settings,
        updated_at: new Date().toISOString()
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Update cached settings in Shopify metafields for performance
    try {
      const admin = await authenticate.admin(request);
      const metafield = new admin.admin.rest.resources.Metafield({
        session: admin.session,
      });
      metafield.namespace = "sticky_cart_drawer";
      metafield.key = "settings";
      metafield.value = JSON.stringify(settings);
      metafield.type = "json";
      await metafield.save({ update: true });
    } catch (metafieldError) {
      console.error('Error caching settings in metafields:', metafieldError);
      // Don't fail the entire operation if metafield fails
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving settings:', error);
    return { success: false, error: 'Failed to save settings' };
  }
};

export default function Settings() {
  const { settings: loadedSettings, shopDomain, error } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  // Default settings
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

  const [settings, setSettings] = useState(loadedSettings || defaultSettings);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleSave = useCallback(() => {
    const formData = new FormData();
    formData.append("settings", JSON.stringify(settings));
    submit(formData, { method: "post" });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [settings, submit]);

  const positionOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ];

  const buttonPositionOptions = [
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
  ];

  if (error) {
    return (
      <Page>
        <ui-title-bar title="Settings" />
        <Layout>
          <Layout.Section>
            <Banner status="critical">
              <Text>Error loading settings: {error}</Text>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Frame>
      <Page>
        <ui-title-bar title="Cart Drawer Settings">
          <button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
          <button onClick={() => setPreviewOpen(true)}>
            Preview Cart
          </button>
        </ui-title-bar>

        {showSuccess && (
          <Layout.Section>
            <Banner status="success">
              <Text>Settings saved successfully!</Text>
            </Banner>
          </Layout.Section>
        )}

        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              {/* Core Cart Settings */}
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Core Cart Settings
                  </Text>
                  
                  <Checkbox
                    label="Enable Cart Drawer"
                    checked={settings.cartEnabled}
                    onChange={(value) => handleSettingChange('cartEnabled', value)}
                    helpText="Toggle to enable/disable the cart drawer. When disabled, Shopify's native cart will be used."
                  />

                  <Select
                    label="Drawer Position"
                    options={positionOptions}
                    value={settings.drawerPosition}
                    onChange={(value) => handleSettingChange('drawerPosition', value)}
                  />

                  <div>
                    <Text as="h3" variant="headingSm">Theme Color</Text>
                    <ColorPicker
                      color={settings.themeColor}
                      onChange={(color) => handleSettingChange('themeColor', color.hex)}
                    />
                  </div>
                </BlockStack>
              </Card>

              {/* Sticky Button Settings */}
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Sticky Cart Button
                  </Text>
                  
                  <Checkbox
                    label="Enable Sticky Button"
                    checked={settings.stickyButtonEnabled}
                    onChange={(value) => handleSettingChange('stickyButtonEnabled', value)}
                  />

                  <TextField
                    label="Button Text"
                    value={settings.stickyButtonText}
                    onChange={(value) => handleSettingChange('stickyButtonText', value)}
                    disabled={!settings.stickyButtonEnabled}
                  />

                  <Select
                    label="Button Position"
                    options={buttonPositionOptions}
                    value={settings.stickyButtonPosition}
                    onChange={(value) => handleSettingChange('stickyButtonPosition', value)}
                    disabled={!settings.stickyButtonEnabled}
                  />
                </BlockStack>
              </Card>

              {/* Upsells Settings */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                      Product Upsells
                    </Text>
                    <Badge status={settings.upsellsEnabled ? 'success' : 'info'}>
                      {settings.upsellsEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </InlineStack>
                  
                  <Checkbox
                    label="Enable Upsells"
                    checked={settings.upsellsEnabled}
                    onChange={(value) => handleSettingChange('upsellsEnabled', value)}
                    helpText="Show recommended products in the cart drawer"
                  />

                  <Button 
                    disabled={!settings.upsellsEnabled}
                    onClick={() => {
                      // ResourcePicker will be implemented here
                      console.log('Open resource picker for upsells');
                    }}
                  >
                    Select Upsell Products ({settings.upsellProducts.length})
                  </Button>
                </BlockStack>
              </Card>

              {/* Add-ons Settings */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                      Product Add-ons
                    </Text>
                    <Badge status={settings.addOnsEnabled ? 'success' : 'info'}>
                      {settings.addOnsEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </InlineStack>
                  
                  <Checkbox
                    label="Enable Add-ons"
                    checked={settings.addOnsEnabled}
                    onChange={(value) => handleSettingChange('addOnsEnabled', value)}
                    helpText="Show optional add-on products as checkboxes"
                  />

                  <Button 
                    disabled={!settings.addOnsEnabled}
                    onClick={() => {
                      // ResourcePicker will be implemented here
                      console.log('Open resource picker for add-ons');
                    }}
                  >
                    Select Add-on Products ({settings.addOnProducts.length})
                  </Button>
                </BlockStack>
              </Card>

              {/* Free Shipping Settings */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                      Free Shipping Bar
                    </Text>
                    <Badge status={settings.freeShippingEnabled ? 'success' : 'info'}>
                      {settings.freeShippingEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </InlineStack>
                  
                  <Checkbox
                    label="Enable Free Shipping Bar"
                    checked={settings.freeShippingEnabled}
                    onChange={(value) => handleSettingChange('freeShippingEnabled', value)}
                    helpText="Show progress bar for free shipping threshold"
                  />

                  <TextField
                    label="Free Shipping Threshold ($)"
                    type="number"
                    value={settings.freeShippingThreshold.toString()}
                    onChange={(value) => handleSettingChange('freeShippingThreshold', parseFloat(value) || 0)}
                    disabled={!settings.freeShippingEnabled}
                  />
                </BlockStack>
              </Card>

              {/* Discount Settings */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                      Discount Promotions
                    </Text>
                    <Badge status={settings.discountEnabled ? 'success' : 'info'}>
                      {settings.discountEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </InlineStack>
                  
                  <Checkbox
                    label="Enable Discount Bar"
                    checked={settings.discountEnabled}
                    onChange={(value) => handleSettingChange('discountEnabled', value)}
                    helpText="Show discount code application bar"
                  />

                  <TextField
                    label="Featured Discount Code"
                    value={settings.discountCode}
                    onChange={(value) => handleSettingChange('discountCode', value)}
                    disabled={!settings.discountEnabled}
                    placeholder="SAVE10"
                  />
                </BlockStack>
              </Card>

              {/* Announcements Settings */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">
                      Announcements
                    </Text>
                    <Badge status={settings.announcementEnabled ? 'success' : 'info'}>
                      {settings.announcementEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </InlineStack>
                  
                  <Checkbox
                    label="Enable Announcement Banner"
                    checked={settings.announcementEnabled}
                    onChange={(value) => handleSettingChange('announcementEnabled', value)}
                  />

                  <TextField
                    label="Announcement Text"
                    value={settings.announcementText}
                    onChange={(value) => handleSettingChange('announcementText', value)}
                    disabled={!settings.announcementEnabled}
                    placeholder="Free shipping on orders over $50!"
                    multiline={3}
                  />
                </BlockStack>
              </Card>

              {/* Analytics Settings */}
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Analytics Integration
                  </Text>
                  
                  <TextField
                    label="Facebook Pixel ID"
                    value={settings.fbPixelId}
                    onChange={(value) => handleSettingChange('fbPixelId', value)}
                    placeholder="123456789012345"
                    helpText="Optional: Add your Facebook Pixel ID for conversion tracking"
                  />

                  <TextField
                    label="Google Ads Conversion ID"
                    value={settings.googleAdsId}
                    onChange={(value) => handleSettingChange('googleAdsId', value)}
                    placeholder="AW-1234567890"
                    helpText="Optional: Add your Google Ads conversion ID"
                  />
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">
                  Settings Summary
                </Text>
                <Text>
                  Cart Drawer: {settings.cartEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Sticky Button: {settings.stickyButtonEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Upsells: {settings.upsellsEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Add-ons: {settings.addOnsEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Free Shipping: {settings.freeShippingEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Discounts: {settings.discountEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Text>
                  Announcements: {settings.announcementEnabled ? '✅ Enabled' : '❌ Disabled'}
                </Text>
                <Divider />
                <Button variant="primary" onClick={() => setPreviewOpen(true)}>
                  Preview Cart Drawer
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Preview Modal */}
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title="Cart Drawer Preview"
          large
        >
          <Modal.Section>
            <div 
              style={{
                width: '400px',
                height: '600px',
                border: '1px solid #e1e1e1',
                borderRadius: '8px',
                backgroundColor: '#fff',
                position: 'relative',
                margin: '0 auto'
              }}
            >
              <CartDrawerPreview settings={settings} />
            </div>
          </Modal.Section>
        </Modal>
      </Page>
    </Frame>
  );
}

// Preview component that matches the live cart drawer
function CartDrawerPreview({ settings }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e1e1e1',
        backgroundColor: settings.themeColor,
        color: settings.themeColor === '#000000' ? '#fff' : '#000'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          Shopping Cart (2)
        </h3>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {/* Announcement */}
        {settings.announcementEnabled && settings.announcementText && (
          <div style={{
            backgroundColor: '#f0f8ff',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {settings.announcementText}
          </div>
        )}

        {/* Free Shipping Bar */}
        {settings.freeShippingEnabled && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '12px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                Add $20 more for free shipping!
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#e1e1e1',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '60%',
                  height: '100%',
                  backgroundColor: settings.themeColor,
                  borderRadius: '3px'
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex',
            padding: '12px',
            border: '1px solid #e1e1e1',
            borderRadius: '6px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              marginRight: '12px'
            }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Sample Product</h4>
              <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>Color: Black, Size: M</p>
              <p style={{ margin: '4px 0 0 0', fontWeight: '600' }}>$29.99</p>
            </div>
          </div>
        </div>

        {/* Upsells */}
        {settings.upsellsEnabled && (
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Frequently Bought Together</h4>
            <div style={{
              display: 'flex',
              padding: '12px',
              border: '1px solid #e1e1e1',
              borderRadius: '6px',
              alignItems: 'center'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginRight: '12px'
              }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Recommended Product</h5>
                <p style={{ margin: '0', fontWeight: '600' }}>$19.99</p>
              </div>
              <button style={{
                backgroundColor: settings.themeColor,
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                Add
              </button>
            </div>
          </div>
        )}

        {/* Add-ons */}
        {settings.addOnsEnabled && (
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Add Protection</h4>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              border: '1px solid #e1e1e1',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              <span style={{ flex: 1, fontSize: '14px' }}>Shipping Protection (+$2.99)</span>
            </label>
          </div>
        )}

        {/* Discount Bar */}
        {settings.discountEnabled && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              border: '1px solid #e1e1e1',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <input
                type="text"
                placeholder="Enter discount code"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: 'none',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: settings.themeColor,
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                fontSize: '14px'
              }}>
                Apply
              </button>
            </div>
            {settings.discountCode && (
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#666',
                textAlign: 'center'
              }}>
                Try code: <strong>{settings.discountCode}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e1e1e1',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          <span>Total:</span>
          <span>$59.98</span>
        </div>
        <button style={{
          width: '100%',
          backgroundColor: settings.themeColor,
          color: '#fff',
          border: 'none',
          padding: '14px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Checkout
        </button>
      </div>
    </div>
  );
}