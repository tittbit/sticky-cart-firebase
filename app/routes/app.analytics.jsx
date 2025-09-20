import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  DataTable,
  Badge,
  InlineStack,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  // Fetch orders data for analytics
  try {
    const orders = await admin.rest.resources.Order.all({
      session,
      limit: 250,
      status: 'any'
    });

    // Calculate analytics
    const totalOrders = orders.data.length;
    const totalRevenue = orders.data.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Determine billing tier
    let billingTier = 'Free (Development)';
    let monthlyFee = 0;
    
    if (totalOrders > 500) {
      billingTier = 'Professional';
      monthlyFee = 54.99;
    } else if (totalOrders > 200) {
      billingTier = 'Growth';
      monthlyFee = 34.99;
    } else if (totalOrders > 0) {
      billingTier = 'Starter';
      monthlyFee = 29.99;
    }

    return {
      analytics: {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        billingTier,
        monthlyFee
      },
      shopDomain: session.shop
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      analytics: {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        billingTier: 'Free (Development)',
        monthlyFee: 0
      },
      shopDomain: session.shop,
      error: 'Failed to load analytics data'
    };
  }
};

export default function Analytics() {
  const { analytics, shopDomain, error } = useLoaderData();

  const rows = [
    ['Total Orders', analytics.totalOrders.toLocaleString()],
    ['Total Revenue', `$${analytics.totalRevenue.toFixed(2)}`],
    ['Average Order Value', `$${analytics.averageOrderValue.toFixed(2)}`],
    ['Current Billing Tier', analytics.billingTier],
    ['Monthly Fee', `$${analytics.monthlyFee}`],
  ];

  return (
    <Page>
      <ui-title-bar title="Analytics & Billing" />
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text as="h2" variant="headingMd">
                    Store Performance
                  </Text>
                  <Badge status={analytics.totalOrders > 0 ? 'success' : 'info'}>
                    {analytics.billingTier}
                  </Badge>
                </InlineStack>
                
                {error && (
                  <Text tone="critical">{error}</Text>
                )}
                
                <DataTable
                  columnContentTypes={['text', 'text']}
                  headings={['Metric', 'Value']}
                  rows={rows}
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Billing Information
                </Text>
                
                <Text>
                  Your current billing tier is determined by your total number of orders:
                </Text>
                
                <div style={{ marginLeft: '16px' }}>
                  <Text>• Free: Development stores only</Text>
                  <Text>• Starter ($29.99/mo): 0-200 orders</Text>
                  <Text>• Growth ($34.99/mo): 201-500 orders</Text>
                  <Text>• Professional ($54.99/mo): 501-1000 orders</Text>
                </div>
                
                <Text>
                  All paid plans include a 14-day free trial. Billing is handled securely through Shopify.
                </Text>
                
                {analytics.totalOrders > 0 && (
                  <Text tone="subdued">
                    Based on your {analytics.totalOrders} orders, you are in the {analytics.billingTier} tier.
                  </Text>
                )}
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Cart Drawer Impact
                </Text>
                
                <Text>
                  Track how the Sticky Cart Drawer is impacting your store's performance:
                </Text>
                
                <div style={{ marginLeft: '16px' }}>
                  <Text>✅ Reduced cart abandonment</Text>
                  <Text>✅ Increased average order value through upsells</Text>
                  <Text>✅ Improved user experience with faster checkout</Text>
                  <Text>✅ Enhanced mobile shopping experience</Text>
                </div>
                
                <Text tone="subdued">
                  Detailed analytics and conversion tracking coming soon!
                </Text>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}