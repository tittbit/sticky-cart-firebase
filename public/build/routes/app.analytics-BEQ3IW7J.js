import {
  useLoaderData
} from "/build/_shared/chunk-RS7RGJOC.js";
import {
  Badge,
  BlockStack,
  Card,
  DataTable,
  InlineStack,
  Layout,
  Page,
  Text,
  require_shopify
} from "/build/_shared/chunk-YJPRSLSW.js";
import {
  createHotContext
} from "/build/_shared/chunk-U5E2PCIK.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.analytics.jsx
var import_shopify = __toESM(require_shopify(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.analytics.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.analytics.jsx"
  );
  import.meta.hot.lastModified = "1758306459011";
}
function Analytics() {
  _s();
  const {
    analytics,
    shopDomain,
    error
  } = useLoaderData();
  const rows = [["Total Orders", analytics.totalOrders.toLocaleString()], ["Total Revenue", `$${analytics.totalRevenue.toFixed(2)}`], ["Average Order Value", `$${analytics.averageOrderValue.toFixed(2)}`], ["Current Billing Tier", analytics.billingTier], ["Monthly Fee", `$${analytics.monthlyFee}`]];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ui-title-bar", { title: "Analytics & Billing" }, void 0, false, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Store Performance" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 100,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: analytics.totalOrders > 0 ? "success" : "info", children: analytics.billingTier }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 103,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 99,
          columnNumber: 17
        }, this),
        error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { tone: "critical", children: error }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 108,
          columnNumber: 27
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DataTable, { columnContentTypes: ["text", "text"], headings: ["Metric", "Value"], rows }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 110,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 98,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Billing Information" }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 116,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Your current billing tier is determined by your total number of orders:" }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 120,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginLeft: "16px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2022 Free: Development stores only" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2022 Starter ($29.99/mo): 0-200 orders" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2022 Growth ($34.99/mo): 201-500 orders" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2022 Professional ($54.99/mo): 501-1000 orders" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 130,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 124,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "All paid plans include a 14-day free trial. Billing is handled securely through Shopify." }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 133,
          columnNumber: 17
        }, this),
        analytics.totalOrders > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { tone: "subdued", children: [
          "Based on your ",
          analytics.totalOrders,
          " orders, you are in the ",
          analytics.billingTier,
          " tier."
        ] }, void 0, true, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 137,
          columnNumber: 47
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 115,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 114,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Cart Drawer Impact" }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 145,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Track how the Sticky Cart Drawer is impacting your store's performance:" }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 149,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginLeft: "16px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2705 Reduced cart abandonment" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 156,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2705 Increased average order value through upsells" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 157,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2705 Improved user experience with faster checkout" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 158,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "\u2705 Enhanced mobile shopping experience" }, void 0, false, {
            fileName: "app/routes/app.analytics.jsx",
            lineNumber: 159,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 153,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { tone: "subdued", children: "Detailed analytics and conversion tracking coming soon!" }, void 0, false, {
          fileName: "app/routes/app.analytics.jsx",
          lineNumber: 162,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 144,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app.analytics.jsx",
        lineNumber: 143,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 96,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 95,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app.analytics.jsx",
      lineNumber: 94,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.analytics.jsx",
    lineNumber: 92,
    columnNumber: 10
  }, this);
}
_s(Analytics, "63XvUh4n6hK8XXZXkTh7ZLDQZ9s=", false, function() {
  return [useLoaderData];
});
_c = Analytics;
var _c;
$RefreshReg$(_c, "Analytics");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Analytics as default
};
//# sourceMappingURL=/build/routes/app.analytics-BEQ3IW7J.js.map
