import {
  useLoaderData,
  useNavigation,
  useSubmit
} from "/build/_shared/chunk-SZWTPZZO.js";
import {
  Badge,
  Banner,
  BlockStack,
  Button,
  Card,
  Checkbox,
  Divider,
  Frame,
  InlineStack,
  Layout,
  Modal,
  Page,
  Select,
  Text,
  TextField,
  require_shopify
} from "/build/_shared/chunk-YJPRSLSW.js";
import {
  createHotContext
} from "/build/_shared/chunk-POY62M5B.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.settings.jsx
var import_react = __toESM(require_react(), 1);
var import_shopify = __toESM(require_shopify(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\app.settings.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\app.settings.jsx"
  );
  import.meta.hot.lastModified = "1758380316000";
}
function Settings() {
  _s();
  const {
    settings: loadedSettings,
    shopDomain,
    error
  } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const defaultSettings = {
    cartEnabled: true,
    drawerPosition: "right",
    themeColor: "#000000",
    stickyButtonEnabled: true,
    stickyButtonText: "Cart",
    stickyButtonPosition: "bottom-right",
    upsellsEnabled: false,
    upsellProducts: [],
    addOnsEnabled: false,
    addOnProducts: [],
    freeShippingEnabled: false,
    freeShippingThreshold: 50,
    discountEnabled: false,
    discountCode: "",
    announcementEnabled: false,
    announcementText: "",
    fbPixelId: "",
    googleAdsId: ""
  };
  const [settings, setSettings] = (0, import_react.useState)(loadedSettings || defaultSettings);
  const [previewOpen, setPreviewOpen] = (0, import_react.useState)(false);
  const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
  const handleSettingChange = (0, import_react.useCallback)((key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);
  const handleSave = (0, import_react.useCallback)(() => {
    const formData = new FormData();
    formData.append("settings", JSON.stringify(settings));
    submit(formData, {
      method: "post"
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3e3);
  }, [settings, submit]);
  const positionOptions = [{
    label: "Left",
    value: "left"
  }, {
    label: "Right",
    value: "right"
  }];
  const buttonPositionOptions = [{
    label: "Bottom Right",
    value: "bottom-right"
  }, {
    label: "Bottom Left",
    value: "bottom-left"
  }, {
    label: "Top Right",
    value: "top-right"
  }, {
    label: "Top Left",
    value: "top-left"
  }];
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ui-title-bar", { title: "Settings" }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 207,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banner, { status: "critical", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
        "Error loading settings: ",
        error
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 211,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 210,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 209,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 208,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 206,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Frame, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ui-title-bar", { title: "Cart Drawer Settings", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { variant: "primary", onClick: handleSave, disabled: isLoading, children: isLoading ? "Saving..." : "Save Settings" }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 220,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setPreviewOpen(true), children: "Preview Cart" }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 223,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 219,
      columnNumber: 9
    }, this),
    showSuccess && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banner, { status: "success", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Settings saved successfully!" }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 230,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 229,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 228,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Core Cart Settings" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 240,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Cart Drawer", checked: settings.cartEnabled, onChange: (value) => handleSettingChange("cartEnabled", value), helpText: "Toggle to enable/disable the cart drawer. When disabled, Shopify's native cart will be used." }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 244,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "Drawer Position", options: positionOptions, value: settings.drawerPosition, onChange: (value) => handleSettingChange("drawerPosition", value) }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 246,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingSm", children: "Theme Color" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 249,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Theme Color (Hex)", value: settings.themeColor, onChange: (value) => handleSettingChange("themeColor", value), placeholder: "#000000", helpText: "Enter a hex color code (e.g., #000000)" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 250,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 248,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 239,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 238,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Sticky Cart Button" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 258,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Sticky Button", checked: settings.stickyButtonEnabled, onChange: (value) => handleSettingChange("stickyButtonEnabled", value) }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 262,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Button Text", value: settings.stickyButtonText, onChange: (value) => handleSettingChange("stickyButtonText", value), disabled: !settings.stickyButtonEnabled }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 264,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "Button Position", options: buttonPositionOptions, value: settings.stickyButtonPosition, onChange: (value) => handleSettingChange("stickyButtonPosition", value), disabled: !settings.stickyButtonEnabled }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 266,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 257,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 256,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Product Upsells" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 274,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: settings.upsellsEnabled ? "success" : "info", children: settings.upsellsEnabled ? "Enabled" : "Disabled" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 277,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 273,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Upsells", checked: settings.upsellsEnabled, onChange: (value) => handleSettingChange("upsellsEnabled", value), helpText: "Show recommended products in the cart drawer" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 282,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { disabled: !settings.upsellsEnabled, onClick: () => {
            console.log("Open resource picker for upsells");
          }, children: [
            "Select Upsell Products (",
            settings.upsellProducts.length,
            ")"
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 284,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 272,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 271,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Product Add-ons" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 297,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: settings.addOnsEnabled ? "success" : "info", children: settings.addOnsEnabled ? "Enabled" : "Disabled" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 300,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 296,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Add-ons", checked: settings.addOnsEnabled, onChange: (value) => handleSettingChange("addOnsEnabled", value), helpText: "Show optional add-on products as checkboxes" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 305,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { disabled: !settings.addOnsEnabled, onClick: () => {
            console.log("Open resource picker for add-ons");
          }, children: [
            "Select Add-on Products (",
            settings.addOnProducts.length,
            ")"
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 307,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 295,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 294,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Free Shipping Bar" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 320,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: settings.freeShippingEnabled ? "success" : "info", children: settings.freeShippingEnabled ? "Enabled" : "Disabled" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 323,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 319,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Free Shipping Bar", checked: settings.freeShippingEnabled, onChange: (value) => handleSettingChange("freeShippingEnabled", value), helpText: "Show progress bar for free shipping threshold" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 328,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Free Shipping Threshold ($)", type: "number", value: settings.freeShippingThreshold.toString(), onChange: (value) => handleSettingChange("freeShippingThreshold", parseFloat(value) || 0), disabled: !settings.freeShippingEnabled }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 330,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 318,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 317,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Discount Promotions" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 338,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: settings.discountEnabled ? "success" : "info", children: settings.discountEnabled ? "Enabled" : "Disabled" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 341,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 337,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Discount Bar", checked: settings.discountEnabled, onChange: (value) => handleSettingChange("discountEnabled", value), helpText: "Show discount code application bar" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 346,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Featured Discount Code", value: settings.discountCode, onChange: (value) => handleSettingChange("discountCode", value), disabled: !settings.discountEnabled, placeholder: "SAVE10" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 348,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 336,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 335,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Announcements" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 356,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { status: settings.announcementEnabled ? "success" : "info", children: settings.announcementEnabled ? "Enabled" : "Disabled" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 359,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 355,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, { label: "Enable Announcement Banner", checked: settings.announcementEnabled, onChange: (value) => handleSettingChange("announcementEnabled", value) }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 364,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Announcement Text", value: settings.announcementText, onChange: (value) => handleSettingChange("announcementText", value), disabled: !settings.announcementEnabled, placeholder: "Free shipping on orders over $50!", multiline: 3 }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 366,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 354,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 353,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "400", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Analytics Integration" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 373,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Facebook Pixel ID", value: settings.fbPixelId, onChange: (value) => handleSettingChange("fbPixelId", value), placeholder: "123456789012345", helpText: "Optional: Add your Facebook Pixel ID for conversion tracking" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 377,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Google Ads Conversion ID", value: settings.googleAdsId, onChange: (value) => handleSettingChange("googleAdsId", value), placeholder: "AW-1234567890", helpText: "Optional: Add your Google Ads conversion ID" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 379,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 372,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 371,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 236,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 235,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingSm", children: "Settings Summary" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 388,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Cart Drawer: ",
          settings.cartEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 391,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Sticky Button: ",
          settings.stickyButtonEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 394,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Upsells: ",
          settings.upsellsEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 397,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Add-ons: ",
          settings.addOnsEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 400,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Free Shipping: ",
          settings.freeShippingEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 403,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Discounts: ",
          settings.discountEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 406,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
          "Announcements: ",
          settings.announcementEnabled ? "\u2705 Enabled" : "\u274C Disabled"
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 409,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider, {}, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 412,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "primary", onClick: () => setPreviewOpen(true), children: "Preview Cart Drawer" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 413,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 387,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 386,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 385,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 234,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal, { open: previewOpen, onClose: () => setPreviewOpen(false), title: "Cart Drawer Preview", large: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Modal.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      width: "400px",
      height: "600px",
      border: "1px solid #e1e1e1",
      borderRadius: "8px",
      backgroundColor: "#fff",
      position: "relative",
      margin: "0 auto"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartDrawerPreview, { settings }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 433,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 424,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 423,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 422,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 218,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 217,
    columnNumber: 10
  }, this);
}
_s(Settings, "tJAmcUQQHUIyli0FESni0w6DIKM=", false, function() {
  return [useLoaderData, useSubmit, useNavigation];
});
_c = Settings;
function CartDrawerPreview({
  settings
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      padding: "20px",
      borderBottom: "1px solid #e1e1e1",
      backgroundColor: settings.themeColor,
      color: settings.themeColor === "#000000" ? "#fff" : "#000"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "600"
    }, children: "Shopping Cart (2)" }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 466,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 460,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      flex: 1,
      overflow: "auto",
      padding: "20px"
    }, children: [
      settings.announcementEnabled && settings.announcementText && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        backgroundColor: "#f0f8ff",
        padding: "12px",
        borderRadius: "6px",
        marginBottom: "16px",
        fontSize: "14px",
        textAlign: "center"
      }, children: settings.announcementText }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 482,
        columnNumber: 71
      }, this),
      settings.freeShippingEnabled && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "16px"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        backgroundColor: "#f8f9fa",
        padding: "12px",
        borderRadius: "6px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          fontSize: "14px",
          marginBottom: "8px"
        }, children: "Add $20 more for free shipping!" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 503,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          width: "100%",
          height: "6px",
          backgroundColor: "#e1e1e1",
          borderRadius: "3px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          width: "60%",
          height: "100%",
          backgroundColor: settings.themeColor,
          borderRadius: "3px"
        } }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 516,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 509,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 497,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 494,
        columnNumber: 42
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "16px"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        padding: "12px",
        border: "1px solid #e1e1e1",
        borderRadius: "6px",
        marginBottom: "8px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          width: "60px",
          height: "60px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          marginRight: "12px"
        } }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 537,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
            margin: "0 0 4px 0",
            fontSize: "14px"
          }, children: "Sample Product" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 547,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: "0",
            color: "#666",
            fontSize: "12px"
          }, children: "Color: Black, Size: M" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 551,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: "4px 0 0 0",
            fontWeight: "600"
          }, children: "$29.99" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 556,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 544,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 530,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 527,
        columnNumber: 9
      }, this),
      settings.upsellsEnabled && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
          fontSize: "16px",
          marginBottom: "12px"
        }, children: "Frequently Bought Together" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 568,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          padding: "12px",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            width: "50px",
            height: "50px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            marginRight: "12px"
          } }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 579,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { style: {
              margin: "0 0 4px 0",
              fontSize: "14px"
            }, children: "Recommended Product" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 589,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
              margin: "0",
              fontWeight: "600"
            }, children: "$19.99" }, void 0, false, {
              fileName: "app/routes/app.settings.jsx",
              lineNumber: 593,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 586,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
            backgroundColor: settings.themeColor,
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "12px"
          }, children: "Add" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 598,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 572,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 565,
        columnNumber: 37
      }, this),
      settings.addOnsEnabled && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
          fontSize: "16px",
          marginBottom: "12px"
        }, children: "Add Protection" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 615,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: {
          display: "flex",
          alignItems: "center",
          padding: "8px",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          cursor: "pointer"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", style: {
            marginRight: "8px"
          } }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 627,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            flex: 1,
            fontSize: "14px"
          }, children: "Shipping Protection (+$2.99)" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 630,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 619,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 612,
        columnNumber: 36
      }, this),
      settings.discountEnabled && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "flex",
          border: "1px solid #e1e1e1",
          borderRadius: "6px",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Enter discount code", style: {
            flex: 1,
            padding: "8px 12px",
            border: "none",
            fontSize: "14px"
          } }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 647,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
            backgroundColor: settings.themeColor,
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            fontSize: "14px"
          }, children: "Apply" }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 653,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 641,
          columnNumber: 13
        }, this),
        settings.discountCode && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginTop: "8px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center"
        }, children: [
          "Try code: ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: settings.discountCode }, void 0, false, {
            fileName: "app/routes/app.settings.jsx",
            lineNumber: 669,
            columnNumber: 27
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 663,
          columnNumber: 39
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 638,
        columnNumber: 38
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 476,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      padding: "20px",
      borderTop: "1px solid #e1e1e1",
      backgroundColor: "#f8f9fa"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
        fontSize: "16px",
        fontWeight: "600"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total:" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 687,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "$59.98" }, void 0, false, {
          fileName: "app/routes/app.settings.jsx",
          lineNumber: 688,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 680,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
        width: "100%",
        backgroundColor: settings.themeColor,
        color: "#fff",
        border: "none",
        padding: "14px",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer"
      }, children: "Checkout" }, void 0, false, {
        fileName: "app/routes/app.settings.jsx",
        lineNumber: 690,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.settings.jsx",
      lineNumber: 675,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.settings.jsx",
    lineNumber: 449,
    columnNumber: 10
  }, this);
}
_c2 = CartDrawerPreview;
var _c;
var _c2;
$RefreshReg$(_c, "Settings");
$RefreshReg$(_c2, "CartDrawerPreview");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Settings as default
};
//# sourceMappingURL=/build/routes/app.settings-R7ZVOAJS.js.map
