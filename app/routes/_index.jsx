import { useLoaderData, Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  Text,
  Button,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <ui-title-bar title="Sticky Cart Drawer">
        <button variant="primary" onClick={() => open("/app/settings", "_self")}>
          Configure Settings
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Welcome to Sticky Cart Drawer! 🛒
              </Text>
              <Text>
                Your app has been successfully installed. Configure your cart drawer settings to start boosting your average order value and reducing cart abandonment.
              </Text>
              <InlineStack gap="300">
                <Button variant="primary" url="/app/settings">
                  Configure Settings
                </Button>
                <Button url="/app/analytics">
                  View Analytics
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
        
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm">
                Features
              </Text>
              <Text>
                • Slide-out cart drawer
              </Text>
              <Text>
                • Sticky cart button
              </Text>
              <Text>
                • Product upsells & cross-sells
              </Text>
              <Text>
                • Free shipping progress bar
              </Text>
              <Text>
                • Discount promotions
              </Text>
              <Text>
                • Custom announcements
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}