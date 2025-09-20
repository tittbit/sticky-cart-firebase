var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/routes/app.proxy.settings.jsx
var app_proxy_settings_exports = {};
__export(app_proxy_settings_exports, {
  action: () => action,
  loader: () => loader
});
import { json } from "@remix-run/node";
var loader = async ({ request }) => {
  let shopDomain = new URL(request.url).searchParams.get("shop");
  if (!shopDomain)
    return json({ error: "Shop parameter is required" }, { status: 400 });
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
      return console.warn("Supabase credentials not configured, using defaults"), json({
        settings: {
          cartEnabled: !0,
          drawerPosition: "right",
          themeColor: "#000000",
          stickyButtonEnabled: !0,
          stickyButtonText: "Cart",
          stickyButtonPosition: "bottom-right",
          upsellsEnabled: !1,
          upsellProducts: [],
          addOnsEnabled: !1,
          addOnProducts: [],
          freeShippingEnabled: !1,
          freeShippingThreshold: 50,
          discountEnabled: !1,
          discountCode: "",
          announcementEnabled: !1,
          announcementText: "",
          fbPixelId: "",
          googleAdsId: ""
        },
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
        success: !0,
        fallback: !0
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Cache-Control": "public, max-age=60"
        }
      });
    let { createClient } = await import("@supabase/supabase-js"), supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    ), { data, error } = await supabase.from("shop_settings").select("settings, updated_at").eq("shop_domain", shopDomain).single();
    return error ? (console.error("Error fetching settings:", error), json({
      settings: {
        cartEnabled: !0,
        drawerPosition: "right",
        themeColor: "#000000",
        stickyButtonEnabled: !0,
        stickyButtonText: "Cart",
        stickyButtonPosition: "bottom-right",
        upsellsEnabled: !1,
        upsellProducts: [],
        addOnsEnabled: !1,
        addOnProducts: [],
        freeShippingEnabled: !1,
        freeShippingThreshold: 50,
        discountEnabled: !1,
        discountCode: "",
        announcementEnabled: !1,
        announcementText: "",
        fbPixelId: "",
        googleAdsId: ""
      },
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      success: !0
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=300"
      }
    })) : json({
      settings: data.settings,
      lastUpdated: data.updated_at,
      success: !0
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    return console.error("Error connecting to database:", error), json({
      settings: {
        cartEnabled: !0,
        drawerPosition: "right",
        themeColor: "#000000",
        stickyButtonEnabled: !0,
        stickyButtonText: "Cart",
        stickyButtonPosition: "bottom-right",
        upsellsEnabled: !1,
        upsellProducts: [],
        addOnsEnabled: !1,
        addOnProducts: [],
        freeShippingEnabled: !1,
        freeShippingThreshold: 50,
        discountEnabled: !1,
        discountCode: "",
        announcementEnabled: !1,
        announcementText: "",
        fbPixelId: "",
        googleAdsId: ""
      },
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      success: !0,
      fallback: !0
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "public, max-age=60"
      }
    });
  }
}, action = async ({ request }) => request.method === "OPTIONS" ? new Response(null, {
  status: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
}) : json({ error: "Method not allowed" }, { status: 405 });

// app/routes/app.analytics.jsx
var app_analytics_exports = {};
__export(app_analytics_exports, {
  default: () => Analytics,
  loader: () => loader2
});
import { useLoaderData } from "@remix-run/react";

// app/shopify.server.js
import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";

// app/db.server.js
import { PrismaClient } from "@prisma/client";
var prisma = global.__db__ ?? new PrismaClient();
global.__db__ = prisma;
var db_server_default = prisma;

// app/shopify.server.js
var shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(db_server_default),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ admin, session }) => {
      await createScriptTag(admin), await initializeDefaultSettings(session.shop);
    }
  }
});
async function createScriptTag(admin) {
  try {
    let scriptTag = new admin.rest.resources.ScriptTag({ session: admin.session });
    scriptTag.event = "onload", scriptTag.src = `${process.env.SHOPIFY_APP_URL}/cart-drawer.js`, scriptTag.display_scope = "all", await scriptTag.save({
      update: !0
    }), console.log("Script tag created successfully");
  } catch (error) {
    console.error("Error creating script tag:", error);
  }
}
async function initializeDefaultSettings(shopDomain) {
  try {
    let { createClient } = await import("@supabase/supabase-js");
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.warn("Supabase credentials not found, skipping settings initialization");
      return;
    }
    let supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    ), defaultSettings = {
      cartEnabled: !0,
      drawerPosition: "right",
      themeColor: "#000000",
      stickyButtonEnabled: !0,
      stickyButtonText: "Cart",
      stickyButtonPosition: "bottom-right",
      upsellsEnabled: !1,
      upsellProducts: [],
      addOnsEnabled: !1,
      addOnProducts: [],
      freeShippingEnabled: !1,
      freeShippingThreshold: 50,
      discountEnabled: !1,
      discountCode: "",
      announcementEnabled: !1,
      announcementText: "",
      fbPixelId: "",
      googleAdsId: ""
    }, { error } = await supabase.from("shop_settings").upsert({
      shop_domain: shopDomain,
      settings: defaultSettings,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    error ? console.error("Error initializing default settings:", error) : console.log("Default settings initialized for shop:", shopDomain);
  } catch (error) {
    console.error("Error connecting to Supabase:", error);
  }
}
var addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, login = shopify.login, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;

// app/routes/app.analytics.jsx
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  DataTable,
  Badge,
  InlineStack
} from "@shopify/polaris";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var loader2 = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request);
  try {
    let orders = await admin.rest.resources.Order.all({
      session,
      limit: 250,
      status: "any"
    }), totalOrders = orders.data.length, totalRevenue = orders.data.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0), averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0, billingTier = "Free (Development)", monthlyFee = 0;
    return totalOrders > 500 ? (billingTier = "Professional", monthlyFee = 54.99) : totalOrders > 200 ? (billingTier = "Growth", monthlyFee = 34.99) : totalOrders > 0 && (billingTier = "Starter", monthlyFee = 29.99), {
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
    return console.error("Error fetching analytics:", error), {
      analytics: {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        billingTier: "Free (Development)",
        monthlyFee: 0
      },
      shopDomain: session.shop,
      error: "Failed to load analytics data"
    };
  }
};
function Analytics() {
  let { analytics, shopDomain, error } = useLoaderData(), rows = [
    ["Total Orders", analytics.totalOrders.toLocaleString()],
    ["Total Revenue", `$${analytics.totalRevenue.toFixed(2)}`],
    ["Average Order Value", `$${analytics.averageOrderValue.toFixed(2)}`],
    ["Current Billing Tier", analytics.billingTier],
    ["Monthly Fee", `$${analytics.monthlyFee}`]
  ];
  return /* @__PURE__ */ jsxDEV3(Page, { children: [
    /* @__PURE__ */ jsxDEV3("ui-title-bar", { title: "Analytics & Billing" }, void 0, !1, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3(Layout, { children: /* @__PURE__ */ jsxDEV3(Layout.Section, { children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "500", children: [
      /* @__PURE__ */ jsxDEV3(Card, { children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV3(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ jsxDEV3(Text, { as: "h2", variant: "headingMd", children: "Store Performance" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 91,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Badge, { status: analytics.totalOrders > 0 ? "success" : "info", children: analytics.billingTier }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 94,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        error && /* @__PURE__ */ jsxDEV3(Text, { tone: "critical", children: error }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 100,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV3(
          DataTable,
          {
            columnContentTypes: ["text", "text"],
            headings: ["Metric", "Value"],
            rows
          },
          void 0,
          !1,
          {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 103,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 89,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(Card, { children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV3(Text, { as: "h2", variant: "headingMd", children: "Billing Information" }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 113,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3(Text, { children: "Your current billing tier is determined by your total number of orders:" }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 117,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { marginLeft: "16px" }, children: [
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2022 Free: Development stores only" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 122,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2022 Starter ($29.99/mo): 0-200 orders" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 123,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2022 Growth ($34.99/mo): 201-500 orders" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 124,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2022 Professional ($54.99/mo): 501-1000 orders" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 121,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3(Text, { children: "All paid plans include a 14-day free trial. Billing is handled securely through Shopify." }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 128,
          columnNumber: 17
        }, this),
        analytics.totalOrders > 0 && /* @__PURE__ */ jsxDEV3(Text, { tone: "subdued", children: [
          "Based on your ",
          analytics.totalOrders,
          " orders, you are in the ",
          analytics.billingTier,
          " tier."
        ] }, void 0, !0, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 133,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 112,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 111,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV3(Card, { children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV3(Text, { as: "h2", variant: "headingMd", children: "Cart Drawer Impact" }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 142,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3(Text, { children: "Track how the Sticky Cart Drawer is impacting your store's performance:" }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 146,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { marginLeft: "16px" }, children: [
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2705 Reduced cart abandonment" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 151,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2705 Increased average order value through upsells" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 152,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2705 Improved user experience with faster checkout" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 153,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV3(Text, { children: "\u2705 Enhanced mobile shopping experience" }, void 0, !1, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 154,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 150,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3(Text, { tone: "subdued", children: "Detailed analytics and conversion tracking coming soon!" }, void 0, !1, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 157,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 141,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 140,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 87,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 86,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 85,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.analytics.jsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}

// app/routes/app.settings.jsx
var app_settings_exports = {};
__export(app_settings_exports, {
  action: () => action2,
  default: () => Settings,
  loader: () => loader3
});
import { useState, useCallback } from "react";
import { useLoaderData as useLoaderData2, useSubmit, useNavigation } from "@remix-run/react";
import {
  Card as Card2,
  Layout as Layout2,
  Page as Page2,
  Text as Text2,
  Button,
  BlockStack as BlockStack2,
  InlineStack as InlineStack2,
  Checkbox,
  TextField,
  Select,
  Divider,
  Banner,
  Frame,
  Modal,
  Badge as Badge2
} from "@shopify/polaris";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var loader3 = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request);
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
      return console.warn("Supabase credentials not configured"), {
        settings: null,
        shopDomain: session.shop,
        error: "Database not configured"
      };
    let { createClient } = await import("@supabase/supabase-js"), supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    ), { data, error } = await supabase.from("shop_settings").select("settings").eq("shop_domain", session.shop).single();
    return error && error.code !== "PGRST116" ? (console.error("Error loading settings:", error), { settings: null, error: error.message }) : {
      settings: data?.settings || null,
      shopDomain: session.shop,
      error: null
    };
  } catch (error) {
    return console.error("Error connecting to Supabase:", error), { settings: null, error: "Database connection failed" };
  }
}, action2 = async ({ request }) => {
  let { session } = await authenticate.admin(request), formData = await request.formData(), settings = JSON.parse(formData.get("settings"));
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY)
      return { success: !1, error: "Database not configured" };
    let { createClient } = await import("@supabase/supabase-js"), supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    ), { error } = await supabase.from("shop_settings").upsert({
      shop_domain: session.shop,
      settings,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (error)
      return { success: !1, error: error.message };
    try {
      let { admin } = await authenticate.admin(request), metafield = new admin.admin.rest.resources.Metafield({
        session: admin.session
      });
      metafield.namespace = "sticky_cart_drawer", metafield.key = "settings", metafield.value = JSON.stringify(settings), metafield.type = "json", await metafield.save({ update: !0 });
    } catch (metafieldError) {
      console.error("Error caching settings in metafields:", metafieldError);
    }
    return { success: !0 };
  } catch (error) {
    return console.error("Error saving settings:", error), { success: !1, error: "Failed to save settings" };
  }
};
function Settings() {
  let { settings: loadedSettings, shopDomain, error } = useLoaderData2(), submit = useSubmit(), isLoading = useNavigation().state === "submitting", defaultSettings = {
    cartEnabled: !0,
    drawerPosition: "right",
    themeColor: "#000000",
    stickyButtonEnabled: !0,
    stickyButtonText: "Cart",
    stickyButtonPosition: "bottom-right",
    upsellsEnabled: !1,
    upsellProducts: [],
    addOnsEnabled: !1,
    addOnProducts: [],
    freeShippingEnabled: !1,
    freeShippingThreshold: 50,
    discountEnabled: !1,
    discountCode: "",
    announcementEnabled: !1,
    announcementText: "",
    fbPixelId: "",
    googleAdsId: ""
  }, [settings, setSettings] = useState(loadedSettings || defaultSettings), [previewOpen, setPreviewOpen] = useState(!1), [showSuccess, setShowSuccess] = useState(!1), handleSettingChange = useCallback((key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []), handleSave = useCallback(() => {
    let formData = new FormData();
    formData.append("settings", JSON.stringify(settings)), submit(formData, { method: "post" }), setShowSuccess(!0), setTimeout(() => setShowSuccess(!1), 3e3);
  }, [settings, submit]), positionOptions = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ], buttonPositionOptions = [
    { label: "Bottom Right", value: "bottom-right" },
    { label: "Bottom Left", value: "bottom-left" },
    { label: "Top Right", value: "top-right" },
    { label: "Top Left", value: "top-left" }
  ];
  return error ? /* @__PURE__ */ jsxDEV4(Page2, { children: [
    /* @__PURE__ */ jsxDEV4("ui-title-bar", { title: "Settings" }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 178,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(Layout2, { children: /* @__PURE__ */ jsxDEV4(Layout2.Section, { children: /* @__PURE__ */ jsxDEV4(Banner, { status: "critical", children: /* @__PURE__ */ jsxDEV4(Text2, { children: [
      "Error loading settings: ",
      error
    ] }, void 0, !0, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 182,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 181,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 180,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 179,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 177,
    columnNumber: 7
  }, this) : /* @__PURE__ */ jsxDEV4(Frame, { children: /* @__PURE__ */ jsxDEV4(Page2, { children: [
    /* @__PURE__ */ jsxDEV4("ui-title-bar", { title: "Cart Drawer Settings", children: [
      /* @__PURE__ */ jsxDEV4("button", { variant: "primary", onClick: handleSave, disabled: isLoading, children: isLoading ? "Saving..." : "Save Settings" }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 194,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("button", { onClick: () => setPreviewOpen(!0), children: "Preview Cart" }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 197,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 193,
      columnNumber: 9
    }, this),
    showSuccess && /* @__PURE__ */ jsxDEV4(Layout2.Section, { children: /* @__PURE__ */ jsxDEV4(Banner, { status: "success", children: /* @__PURE__ */ jsxDEV4(Text2, { children: "Settings saved successfully!" }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 205,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 204,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 203,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4(Layout2, { children: [
      /* @__PURE__ */ jsxDEV4(Layout2.Section, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "500", children: [
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Core Cart Settings" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 216,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Cart Drawer",
              checked: settings.cartEnabled,
              onChange: (value) => handleSettingChange("cartEnabled", value),
              helpText: "Toggle to enable/disable the cart drawer. When disabled, Shopify's native cart will be used."
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 220,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            Select,
            {
              label: "Drawer Position",
              options: positionOptions,
              value: settings.drawerPosition,
              onChange: (value) => handleSettingChange("drawerPosition", value)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 227,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4("div", { children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingSm", children: "Theme Color" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 235,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(
              TextField,
              {
                label: "Theme Color (Hex)",
                value: settings.themeColor,
                onChange: (value) => handleSettingChange("themeColor", value),
                placeholder: "#000000",
                helpText: "Enter a hex color code (e.g., #000000)"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app.settings.jsx",
                lineNumber: 236,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 234,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 215,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 214,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Sticky Cart Button" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 250,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Sticky Button",
              checked: settings.stickyButtonEnabled,
              onChange: (value) => handleSettingChange("stickyButtonEnabled", value)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 254,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Button Text",
              value: settings.stickyButtonText,
              onChange: (value) => handleSettingChange("stickyButtonText", value),
              disabled: !settings.stickyButtonEnabled
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 260,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            Select,
            {
              label: "Button Position",
              options: buttonPositionOptions,
              value: settings.stickyButtonPosition,
              onChange: (value) => handleSettingChange("stickyButtonPosition", value),
              disabled: !settings.stickyButtonEnabled
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 267,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 249,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 248,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(InlineStack2, { align: "space-between", children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Product Upsells" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 281,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(Badge2, { status: settings.upsellsEnabled ? "success" : "info", children: settings.upsellsEnabled ? "Enabled" : "Disabled" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 284,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 280,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Upsells",
              checked: settings.upsellsEnabled,
              onChange: (value) => handleSettingChange("upsellsEnabled", value),
              helpText: "Show recommended products in the cart drawer"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 289,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            Button,
            {
              disabled: !settings.upsellsEnabled,
              onClick: () => {
                console.log("Open resource picker for upsells");
              },
              children: [
                "Select Upsell Products (",
                settings.upsellProducts.length,
                ")"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 296,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 279,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 278,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(InlineStack2, { align: "space-between", children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Product Add-ons" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 312,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(Badge2, { status: settings.addOnsEnabled ? "success" : "info", children: settings.addOnsEnabled ? "Enabled" : "Disabled" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 315,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 311,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Add-ons",
              checked: settings.addOnsEnabled,
              onChange: (value) => handleSettingChange("addOnsEnabled", value),
              helpText: "Show optional add-on products as checkboxes"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 320,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            Button,
            {
              disabled: !settings.addOnsEnabled,
              onClick: () => {
                console.log("Open resource picker for add-ons");
              },
              children: [
                "Select Add-on Products (",
                settings.addOnProducts.length,
                ")"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 327,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 310,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 309,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(InlineStack2, { align: "space-between", children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Free Shipping Bar" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 343,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(Badge2, { status: settings.freeShippingEnabled ? "success" : "info", children: settings.freeShippingEnabled ? "Enabled" : "Disabled" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 346,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 342,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Free Shipping Bar",
              checked: settings.freeShippingEnabled,
              onChange: (value) => handleSettingChange("freeShippingEnabled", value),
              helpText: "Show progress bar for free shipping threshold"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 351,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Free Shipping Threshold ($)",
              type: "number",
              value: settings.freeShippingThreshold.toString(),
              onChange: (value) => handleSettingChange("freeShippingThreshold", parseFloat(value) || 0),
              disabled: !settings.freeShippingEnabled
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 358,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 341,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 340,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(InlineStack2, { align: "space-between", children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Discount Promotions" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 372,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(Badge2, { status: settings.discountEnabled ? "success" : "info", children: settings.discountEnabled ? "Enabled" : "Disabled" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 375,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 371,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Discount Bar",
              checked: settings.discountEnabled,
              onChange: (value) => handleSettingChange("discountEnabled", value),
              helpText: "Show discount code application bar"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 380,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Featured Discount Code",
              value: settings.discountCode,
              onChange: (value) => handleSettingChange("discountCode", value),
              disabled: !settings.discountEnabled,
              placeholder: "SAVE10"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 387,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 370,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 369,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(InlineStack2, { align: "space-between", children: [
            /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Announcements" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 401,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV4(Badge2, { status: settings.announcementEnabled ? "success" : "info", children: settings.announcementEnabled ? "Enabled" : "Disabled" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 404,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 400,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Checkbox,
            {
              label: "Enable Announcement Banner",
              checked: settings.announcementEnabled,
              onChange: (value) => handleSettingChange("announcementEnabled", value)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 409,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Announcement Text",
              value: settings.announcementText,
              onChange: (value) => handleSettingChange("announcementText", value),
              disabled: !settings.announcementEnabled,
              placeholder: "Free shipping on orders over $50!",
              multiline: 3
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 415,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 399,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 398,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "400", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "Analytics Integration" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 429,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Facebook Pixel ID",
              value: settings.fbPixelId,
              onChange: (value) => handleSettingChange("fbPixelId", value),
              placeholder: "123456789012345",
              helpText: "Optional: Add your Facebook Pixel ID for conversion tracking"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 433,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4(
            TextField,
            {
              label: "Google Ads Conversion ID",
              value: settings.googleAdsId,
              onChange: (value) => handleSettingChange("googleAdsId", value),
              placeholder: "AW-1234567890",
              helpText: "Optional: Add your Google Ads conversion ID"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 441,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 428,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 427,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 212,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 211,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(Layout2.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingSm", children: "Settings Summary" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 456,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Cart Drawer: ",
          settings.cartEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 459,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Sticky Button: ",
          settings.stickyButtonEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 462,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Upsells: ",
          settings.upsellsEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 465,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Add-ons: ",
          settings.addOnsEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 468,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Free Shipping: ",
          settings.freeShippingEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 471,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Discounts: ",
          settings.discountEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 474,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { children: [
          "Announcements: ",
          settings.announcementEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 477,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Divider, {}, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 480,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV4(Button, { variant: "primary", onClick: () => setPreviewOpen(!0), children: "Preview Cart Drawer" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 481,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 455,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 454,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 453,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 210,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4(
      Modal,
      {
        open: previewOpen,
        onClose: () => setPreviewOpen(!1),
        title: "Cart Drawer Preview",
        large: !0,
        children: /* @__PURE__ */ jsxDEV4(Modal.Section, { children: /* @__PURE__ */ jsxDEV4(
          "div",
          {
            style: {
              width: "400px",
              height: "600px",
              border: "1px solid #e1e1e1",
              borderRadius: "8px",
              backgroundColor: "#fff",
              position: "relative",
              margin: "0 auto"
            },
            children: /* @__PURE__ */ jsxDEV4(CartDrawerPreview, { settings }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 508,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 497,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 496,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 490,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 192,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 191,
    columnNumber: 5
  }, this);
}
function CartDrawerPreview({ settings }) {
  return /* @__PURE__ */ jsxDEV4("div", { style: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxDEV4("div", { style: {
      padding: "20px",
      borderBottom: "1px solid #e1e1e1",
      backgroundColor: settings.themeColor,
      color: settings.themeColor === "#000000" ? "#fff" : "#000"
    }, children: /* @__PURE__ */ jsxDEV4("h3", { style: { margin: 0, fontSize: "18px", fontWeight: "600" }, children: "Shopping Cart (2)" }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 537,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 531,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { style: { flex: 1, overflow: "auto", padding: "20px" }, children: [
      settings.announcementEnabled && settings.announcementText && /* @__PURE__ */ jsxDEV4("div", { style: {
        backgroundColor: "#f0f8ff",
        padding: "12px",
        borderRadius: "6px",
        marginBottom: "16px",
        fontSize: "14px",
        textAlign: "center"
      }, children: settings.announcementText }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 546,
        columnNumber: 11
      }, this),
      settings.freeShippingEnabled && /* @__PURE__ */ jsxDEV4("div", { style: { marginBottom: "16px" }, children: /* @__PURE__ */ jsxDEV4("div", { style: {
        backgroundColor: "#f8f9fa",
        padding: "12px",
        borderRadius: "6px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "14px", marginBottom: "8px" }, children: "Add $20 more for free shipping!" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 567,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { style: {
          width: "100%",
          height: "6px",
          backgroundColor: "#e1e1e1",
          borderRadius: "3px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ jsxDEV4("div", { style: {
          width: "60%",
          height: "100%",
          backgroundColor: settings.themeColor,
          borderRadius: "3px"
        } }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 577,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 570,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 561,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 560,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { style: { marginBottom: "16px" }, children: /* @__PURE__ */ jsxDEV4("div", { style: {
        display: "flex",
        padding: "12px",
        border: "1px solid #e1e1e1",
        borderRadius: "6px",
        marginBottom: "8px"
      }, children: [
        /* @__PURE__ */ jsxDEV4("div", { style: {
          width: "60px",
          height: "60px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          marginRight: "12px"
        } }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 597,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxDEV4("h4", { style: { margin: "0 0 4px 0", fontSize: "14px" }, children: "Sample Product" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 605,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { style: { margin: "0", color: "#666", fontSize: "12px" }, children: "Color: Black, Size: M" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 606,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { style: { margin: "4px 0 0 0", fontWeight: "600" }, children: "$29.99" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 607,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 604,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 590,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 589,
        columnNumber: 9
      }, this),
      settings.upsellsEnabled && /* @__PURE__ */ jsxDEV4("div", { style: { marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxDEV4("h4", { style: { fontSize: "16px", marginBottom: "12px" }, children: "Frequently Bought Together" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 615,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { style: {
          display: "flex",
          padding: "12px",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsxDEV4("div", { style: {
            width: "50px",
            height: "50px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            marginRight: "12px"
          } }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 623,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxDEV4("h5", { style: { margin: "0 0 4px 0", fontSize: "14px" }, children: "Recommended Product" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 631,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV4("p", { style: { margin: "0", fontWeight: "600" }, children: "$19.99" }, void 0, !1, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 632,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 630,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("button", { style: {
            backgroundColor: settings.themeColor,
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "12px"
          }, children: "Add" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 634,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 616,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 614,
        columnNumber: 11
      }, this),
      settings.addOnsEnabled && /* @__PURE__ */ jsxDEV4("div", { style: { marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxDEV4("h4", { style: { fontSize: "16px", marginBottom: "12px" }, children: "Add Protection" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 651,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("label", { style: {
          display: "flex",
          alignItems: "center",
          padding: "8px",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          cursor: "pointer"
        }, children: [
          /* @__PURE__ */ jsxDEV4("input", { type: "checkbox", style: { marginRight: "8px" } }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 660,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("span", { style: { flex: 1, fontSize: "14px" }, children: "Shipping Protection (+$2.99)" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 661,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 652,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 650,
        columnNumber: 11
      }, this),
      settings.discountEnabled && /* @__PURE__ */ jsxDEV4("div", { style: { marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxDEV4("div", { style: {
          display: "flex",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ jsxDEV4(
            "input",
            {
              type: "text",
              placeholder: "Enter discount code",
              style: {
                flex: 1,
                padding: "8px 12px",
                border: "none",
                fontSize: "14px"
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 675,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV4("button", { style: {
            backgroundColor: settings.themeColor,
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            fontSize: "14px"
          }, children: "Apply" }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 685,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 669,
          columnNumber: 13
        }, this),
        settings.discountCode && /* @__PURE__ */ jsxDEV4("div", { style: {
          marginTop: "8px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center"
        }, children: [
          "Try code: ",
          /* @__PURE__ */ jsxDEV4("strong", { children: settings.discountCode }, void 0, !1, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 702,
            columnNumber: 27
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 696,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 668,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 543,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { style: {
      padding: "20px",
      borderTop: "1px solid #e1e1e1",
      backgroundColor: "#f8f9fa"
    }, children: [
      /* @__PURE__ */ jsxDEV4("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        fontSize: "16px",
        fontWeight: "600"
      }, children: [
        /* @__PURE__ */ jsxDEV4("span", { children: "Total:" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 722,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4("span", { children: "$59.98" }, void 0, !1, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 723,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 715,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("button", { style: {
        width: "100%",
        backgroundColor: settings.themeColor,
        color: "#fff",
        border: "none",
        padding: "14px",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer"
      }, children: "Checkout" }, void 0, !1, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 725,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 710,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 520,
    columnNumber: 5
  }, this);
}

// app/routes/webhooks.jsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session } = await authenticate.webhook(request);
  switch (topic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      try {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
          console.warn("Supabase credentials not found, skipping cleanup");
          break;
        }
        let { createClient } = await import("@supabase/supabase-js");
        await createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_KEY
        ).from("shop_settings").delete().eq("shop_domain", shop), console.log(`Cleaned up data for uninstalled shop: ${shop}`);
      } catch (error) {
        console.error("Error cleaning up Supabase data:", error);
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

// app/routes/_index.jsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader4
});
import "@remix-run/react";
import {
  Card as Card3,
  Layout as Layout3,
  Page as Page3,
  Text as Text3,
  Button as Button2,
  BlockStack as BlockStack3,
  InlineStack as InlineStack3
} from "@shopify/polaris";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var loader4 = async ({ request }) => (await authenticate.admin(request), null);
function Index() {
  return /* @__PURE__ */ jsxDEV5(Page3, { children: [
    /* @__PURE__ */ jsxDEV5("ui-title-bar", { title: "Sticky Cart Drawer", children: /* @__PURE__ */ jsxDEV5("button", { variant: "primary", onClick: () => open("/app/settings", "_self"), children: "Configure Settings" }, void 0, !1, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 24,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Layout3, { children: [
      /* @__PURE__ */ jsxDEV5(Layout3.Section, { children: /* @__PURE__ */ jsxDEV5(Card3, { children: /* @__PURE__ */ jsxDEV5(BlockStack3, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV5(Text3, { as: "h2", variant: "headingMd", children: "Welcome to Sticky Cart Drawer! \u{1F6D2}" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 32,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "Your app has been successfully installed. Configure your cart drawer settings to start boosting your average order value and reducing cart abandonment." }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 35,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(InlineStack3, { gap: "300", children: [
          /* @__PURE__ */ jsxDEV5(Button2, { variant: "primary", url: "/app/settings", children: "Configure Settings" }, void 0, !1, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 39,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV5(Button2, { url: "/app/analytics", children: "View Analytics" }, void 0, !1, {
            fileName: "app/routes/_index.jsx",
            lineNumber: 42,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 38,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 31,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 30,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5(Layout3.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxDEV5(Card3, { children: /* @__PURE__ */ jsxDEV5(BlockStack3, { gap: "200", children: [
        /* @__PURE__ */ jsxDEV5(Text3, { as: "h3", variant: "headingSm", children: "Features" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 53,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Slide-out cart drawer" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 56,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Sticky cart button" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 59,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Product upsells & cross-sells" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 62,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Free shipping progress bar" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 65,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Discount promotions" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 68,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV5(Text3, { children: "\u2022 Custom announcements" }, void 0, !1, {
          fileName: "app/routes/_index.jsx",
          lineNumber: 71,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 52,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 51,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-LBIWF6GZ.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-SZWTPZZO.js", "/build/_shared/chunk-POY62M5B.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-67OI3SB5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-RES2OROA.js", imports: ["/build/_shared/chunk-YJPRSLSW.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.analytics": { id: "routes/app.analytics", parentId: "root", path: "app/analytics", index: void 0, caseSensitive: void 0, module: "/build/routes/app.analytics-WLHXLVHN.js", imports: ["/build/_shared/chunk-YJPRSLSW.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.proxy.settings": { id: "routes/app.proxy.settings", parentId: "root", path: "app/proxy/settings", index: void 0, caseSensitive: void 0, module: "/build/routes/app.proxy.settings-X3KOIL3R.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.settings": { id: "routes/app.settings", parentId: "root", path: "app/settings", index: void 0, caseSensitive: void 0, module: "/build/routes/app.settings-R7ZVOAJS.js", imports: ["/build/_shared/chunk-YJPRSLSW.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-JFV2P4HI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "67971fca", hmr: { runtime: "/build/_shared\\chunk-POY62M5B.js", timestamp: 1758400665154 }, url: "/build/manifest-67971FCA.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.proxy.settings": {
    id: "routes/app.proxy.settings",
    parentId: "root",
    path: "app/proxy/settings",
    index: void 0,
    caseSensitive: void 0,
    module: app_proxy_settings_exports
  },
  "routes/app.analytics": {
    id: "routes/app.analytics",
    parentId: "root",
    path: "app/analytics",
    index: void 0,
    caseSensitive: void 0,
    module: app_analytics_exports
  },
  "routes/app.settings": {
    id: "routes/app.settings",
    parentId: "root",
    path: "app/settings",
    index: void 0,
    caseSensitive: void 0,
    module: app_settings_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
