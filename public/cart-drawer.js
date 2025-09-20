(function() {
  'use strict';

  // Configuration
  let settings = {};
  let isDrawerOpen = false;
  let cartData = null;
  let lastSettingsUpdate = null;
  
  // Get shop domain from Shopify
  const shopDomain = window.Shopify.shop;
  
  // Initialize the cart drawer
  async function init() {
    try {
      await loadSettings();
      if (settings.cartEnabled) {
        await loadCartData();
        createDrawerHTML();
        createStickyButton();
        bindEvents();
        disableNativeCart();
        console.log('Sticky Cart Drawer initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize cart drawer:', error);
      // Fallback to native cart if initialization fails
      enableNativeCart();
    }
  }

  // Load settings from app proxy
  async function loadSettings() {
    try {
      const response = await fetch(`/apps/cart-drawer/api/settings?shop=${encodeURIComponent(shopDomain)}`);
      const data = await response.json();
      
      if (data.success) {
        settings = data.settings;
        lastSettingsUpdate = data.lastUpdated;
      } else {
        throw new Error('Failed to load settings');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Use default settings as fallback
      settings = {
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
        googleAdsId: ''
      };
    }
  }

  // Load current cart data
  async function loadCartData() {
    try {
      const response = await fetch('/cart.js');
      cartData = await response.json();
      updateCartCount();
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }

  // Create the cart drawer HTML
  function createDrawerHTML() {
    // Remove existing drawer if it exists
    const existingDrawer = document.getElementById('sticky-cart-drawer');
    if (existingDrawer) {
      existingDrawer.remove();
    }

    const drawer = document.createElement('div');
    drawer.id = 'sticky-cart-drawer';
    drawer.className = 'sticky-cart-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer-overlay"></div>
      <div class="cart-drawer-content">
        <div class="cart-drawer-header">
          <h3>Shopping Cart (<span id="cart-count">${cartData?.item_count || 0}</span>)</h3>
          <button class="cart-drawer-close" aria-label="Close cart">×</button>
        </div>
        <div class="cart-drawer-body">
          ${renderCartContent()}
        </div>
        <div class="cart-drawer-footer">
          ${renderCartFooter()}
        </div>
      </div>
    `;
    
    document.body.appendChild(drawer);
    injectStyles();
  }

  // Render cart content
  function renderCartContent() {
    if (!cartData || cartData.item_count === 0) {
      return `
        <div class="cart-empty">
          <p>Your cart is empty</p>
          <button class="continue-shopping-btn">Continue Shopping</button>
        </div>
      `;
    }

    let html = '';

    // Announcement banner
    if (settings.announcementEnabled && settings.announcementText) {
      html += `
        <div class="cart-announcement">
          ${settings.announcementText}
        </div>
      `;
    }

    // Free shipping progress bar
    if (settings.freeShippingEnabled) {
      const threshold = settings.freeShippingThreshold * 100; // Convert to cents
      const current = cartData.total_price;
      const remaining = Math.max(0, threshold - current);
      const progress = Math.min(100, (current / threshold) * 100);
      
      html += `
        <div class="free-shipping-bar">
          <div class="free-shipping-text">
            ${remaining > 0 
              ? `Add $${(remaining / 100).toFixed(2)} more for free shipping!`
              : '🎉 You qualify for free shipping!'
            }
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
      `;
    }

    // Cart items
    html += '<div class="cart-items">';
    cartData.items.forEach(item => {
      html += `
        <div class="cart-item" data-id="${item.variant_id}">
          <div class="item-image">
            <img src="${item.featured_image?.url || ''}" alt="${item.product_title}">
          </div>
          <div class="item-details">
            <h4>${item.product_title}</h4>
            ${item.variant_title ? `<p class="variant-title">${item.variant_title}</p>` : ''}
            <div class="item-price">${formatMoney(item.final_price)}</div>
          </div>
          <div class="item-quantity">
            <button class="qty-btn minus" data-id="${item.variant_id}">-</button>
            <span class="qty">${item.quantity}</span>
            <button class="qty-btn plus" data-id="${item.variant_id}">+</button>
          </div>
          <button class="remove-item" data-id="${item.variant_id}">×</button>
        </div>
      `;
    });
    html += '</div>';

    // Upsells
    if (settings.upsellsEnabled && settings.upsellProducts.length > 0) {
      html += renderUpsells();
    }

    // Add-ons
    if (settings.addOnsEnabled && settings.addOnProducts.length > 0) {
      html += renderAddOns();
    }

    // Discount bar
    if (settings.discountEnabled) {
      html += `
        <div class="discount-section">
          <div class="discount-input-group">
            <input type="text" id="discount-code-input" placeholder="Enter discount code">
            <button id="apply-discount-btn">Apply</button>
          </div>
          ${settings.discountCode ? `
            <div class="featured-discount">
              Try code: <strong>${settings.discountCode}</strong>
            </div>
          ` : ''}
        </div>
      `;
    }

    return html;
  }

  // Render cart footer
  function renderCartFooter() {
    if (!cartData || cartData.item_count === 0) {
      return '';
    }

    return `
      <div class="cart-totals">
        <div class="subtotal">
          <span>Subtotal:</span>
          <span>${formatMoney(cartData.total_price)}</span>
        </div>
        ${cartData.total_discount > 0 ? `
          <div class="discount-total">
            <span>Discount:</span>
            <span>-${formatMoney(cartData.total_discount)}</span>
          </div>
        ` : ''}
      </div>
      <button class="checkout-btn" onclick="window.location.href='/checkout'">
        Checkout
      </button>
      <div class="cart-footer-links">
        <a href="/cart">View Full Cart</a>
      </div>
    `;
  }

  // Render upsell products
  function renderUpsells() {
    // This would fetch and render upsell products
    // For now, return placeholder
    return `
      <div class="upsells-section">
        <h4>Frequently Bought Together</h4>
        <div class="upsell-products">
          <!-- Upsell products will be loaded dynamically -->
        </div>
      </div>
    `;
  }

  // Render add-on products
  function renderAddOns() {
    return `
      <div class="addons-section">
        <h4>Protect Your Purchase</h4>
        <div class="addon-products">
          <!-- Add-on products will be loaded dynamically -->
        </div>
      </div>
    `;
  }

  // Create sticky cart button
  function createStickyButton() {
    if (!settings.stickyButtonEnabled) return;

    // Remove existing button if it exists
    const existingButton = document.getElementById('sticky-cart-button');
    if (existingButton) {
      existingButton.remove();
    }

    const button = document.createElement('button');
    button.id = 'sticky-cart-button';
    button.className = `sticky-cart-button ${settings.stickyButtonPosition}`;
    button.innerHTML = `
      <span class="button-text">${settings.stickyButtonText}</span>
      <span class="button-count" id="sticky-cart-count">${cartData?.item_count || 0}</span>
    `;
    
    document.body.appendChild(button);
    injectButtonStyles();
  }

  // Bind event listeners
  function bindEvents() {
    // Drawer events
    document.addEventListener('click', (e) => {
      if (e.target.matches('#sticky-cart-button, #sticky-cart-button *')) {
        openDrawer();
      }
      
      if (e.target.matches('.cart-drawer-close, .cart-drawer-overlay')) {
        closeDrawer();
      }
      
      if (e.target.matches('.qty-btn.plus')) {
        updateQuantity(e.target.dataset.id, 1);
      }
      
      if (e.target.matches('.qty-btn.minus')) {
        updateQuantity(e.target.dataset.id, -1);
      }
      
      if (e.target.matches('.remove-item')) {
        updateQuantity(e.target.dataset.id, 0);
      }
      
      if (e.target.matches('.continue-shopping-btn')) {
        closeDrawer();
      }
      
      if (e.target.matches('#apply-discount-btn')) {
        applyDiscount();
      }
    });

    // Listen for cart updates from other parts of the site
    document.addEventListener('cart:updated', loadCartData);
    
    // Listen for add to cart events
    document.addEventListener('cart:add', (e) => {
      loadCartData().then(() => {
        if (settings.cartEnabled) {
          openDrawer();
        }
        trackEvent('AddToCart', e.detail);
      });
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    });
  }

  // Open cart drawer
  function openDrawer() {
    const drawer = document.getElementById('sticky-cart-drawer');
    if (drawer) {
      drawer.classList.add('open');
      isDrawerOpen = true;
      document.body.classList.add('cart-drawer-open');
    }
  }

  // Close cart drawer
  function closeDrawer() {
    const drawer = document.getElementById('sticky-cart-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      isDrawerOpen = false;
      document.body.classList.remove('cart-drawer-open');
    }
  }

  // Update cart quantity
  async function updateQuantity(variantId, change) {
    try {
      const currentItem = cartData.items.find(item => item.variant_id.toString() === variantId);
      if (!currentItem) return;

      const newQuantity = change === 0 ? 0 : currentItem.quantity + change;
      
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          updates: { [variantId]: newQuantity }
        })
      });

      if (response.ok) {
        await loadCartData();
        updateCartDisplay();
        trackEvent(newQuantity === 0 ? 'RemoveFromCart' : 'UpdateCart', {
          variant_id: variantId,
          quantity: newQuantity
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  // Apply discount code
  async function applyDiscount() {
    const input = document.getElementById('discount-code-input');
    const code = input.value.trim();
    
    if (!code) return;

    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attributes: { 'Discount Code': code }
        })
      });

      if (response.ok) {
        await loadCartData();
        updateCartDisplay();
        input.value = '';
        trackEvent('AddPaymentInfo', { discount_code: code });
        
        // Show success message
        showMessage('Discount code applied!', 'success');
      } else {
        showMessage('Invalid discount code', 'error');
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      showMessage('Error applying discount code', 'error');
    }
  }

  // Update cart display
  function updateCartDisplay() {
    const drawer = document.getElementById('sticky-cart-drawer');
    if (drawer) {
      const body = drawer.querySelector('.cart-drawer-body');
      const footer = drawer.querySelector('.cart-drawer-footer');
      
      body.innerHTML = renderCartContent();
      footer.innerHTML = renderCartFooter();
    }
    updateCartCount();
  }

  // Update cart count in UI
  function updateCartCount() {
    const count = cartData?.item_count || 0;
    
    // Update sticky button count
    const stickyCount = document.getElementById('sticky-cart-count');
    if (stickyCount) {
      stickyCount.textContent = count;
    }
    
    // Update drawer header count
    const drawerCount = document.getElementById('cart-count');
    if (drawerCount) {
      drawerCount.textContent = count;
    }
  }

  // Show message to user
  function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `cart-message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      message.classList.remove('show');
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  // Track events for analytics
  function trackEvent(eventName, data = {}) {
    // Facebook Pixel
    if (settings.fbPixelId && typeof fbq !== 'undefined') {
      fbq('track', eventName, data);
    }
    
    // Google Ads
    if (settings.googleAdsId && typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
    
    // Custom event for other integrations
    document.dispatchEvent(new CustomEvent('cart:track', {
      detail: { event: eventName, data }
    }));
  }

  // Format money
  function formatMoney(cents) {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  // Disable native cart functionality
  function disableNativeCart() {
    // Prevent default cart form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[action="/cart/add"], [action*="/cart/add"]')) {
        e.preventDefault();
        handleAddToCart(e.target);
      }
    });

    // Override cart drawer/popup functionality
    const nativeCartTriggers = document.querySelectorAll('[href="/cart"], [href*="cart-drawer"], .cart-drawer-toggle');
    nativeCartTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });
  }

  // Enable native cart (fallback)
  function enableNativeCart() {
    // Remove our cart elements
    const drawer = document.getElementById('sticky-cart-drawer');
    const button = document.getElementById('sticky-cart-button');
    
    if (drawer) drawer.remove();
    if (button) button.remove();
  }

  // Handle add to cart form submissions
  async function handleAddToCart(form) {
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const item = await response.json();
        await loadCartData();
        updateCartDisplay();
        openDrawer();
        
        trackEvent('AddToCart', {
          variant_id: item.variant_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  // Inject CSS styles
  function injectStyles() {
    const styleId = 'sticky-cart-drawer-styles';
    let styles = document.getElementById(styleId);
    
    if (styles) {
      styles.remove();
    }
    
    styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      .sticky-cart-drawer {
        position: fixed;
        top: 0;
        ${settings.drawerPosition}: -400px;
        width: 400px;
        height: 100vh;
        z-index: 10001;
        transition: ${settings.drawerPosition} 0.3s ease;
      }
      
      .sticky-cart-drawer.open {
        ${settings.drawerPosition}: 0;
      }
      
      .cart-drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: -1;
      }
      
      .sticky-cart-drawer.open .cart-drawer-overlay {
        opacity: 1;
        visibility: visible;
      }
      
      .cart-drawer-content {
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
      }
      
      .cart-drawer-header {
        padding: 20px;
        border-bottom: 1px solid #e1e1e1;
        background: ${settings.themeColor};
        color: ${settings.themeColor === '#000000' || settings.themeColor === '#ffffff' ? (settings.themeColor === '#000000' ? 'white' : 'black') : 'white'};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .cart-drawer-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
      
      .cart-drawer-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cart-drawer-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      
      .cart-drawer-footer {
        padding: 20px;
        border-top: 1px solid #e1e1e1;
        background: #f8f9fa;
      }
      
      .cart-empty {
        text-align: center;
        padding: 40px 20px;
      }
      
      .continue-shopping-btn {
        background: ${settings.themeColor};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 16px;
      }
      
      .cart-announcement {
        background: #f0f8ff;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 14px;
      }
      
      .free-shipping-bar {
        margin-bottom: 16px;
        background: #f8f9fa;
        padding: 12px;
        border-radius: 6px;
        text-align: center;
      }
      
      .free-shipping-text {
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .progress-bar {
        width: 100%;
        height: 6px;
        background: #e1e1e1;
        border-radius: 3px;
        overflow: hidden;
      }
      
      .progress-fill {
        height: 100%;
        background: ${settings.themeColor};
        border-radius: 3px;
        transition: width 0.3s ease;
      }
      
      .cart-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .item-image {
        width: 60px;
        height: 60px;
        margin-right: 12px;
        border-radius: 4px;
        overflow: hidden;
        background: #f8f9fa;
      }
      
      .item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .item-details {
        flex: 1;
      }
      
      .item-details h4 {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 600;
      }
      
      .variant-title {
        margin: 0;
        font-size: 12px;
        color: #666;
      }
      
      .item-price {
        font-weight: 600;
        margin-top: 4px;
      }
      
      .item-quantity {
        display: flex;
        align-items: center;
        margin-right: 12px;
      }
      
      .qty-btn {
        background: ${settings.themeColor};
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .qty {
        margin: 0 8px;
        font-weight: 600;
        min-width: 20px;
        text-align: center;
      }
      
      .remove-item {
        background: #ff4444;
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .discount-section {
        margin: 16px 0;
      }
      
      .discount-input-group {
        display: flex;
        border: 1px solid #e1e1e1;
        border-radius: 6px;
        overflow: hidden;
      }
      
      .discount-input-group input {
        flex: 1;
        padding: 8px 12px;
        border: none;
        font-size: 14px;
      }
      
      .discount-input-group button {
        background: ${settings.themeColor};
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
      }
      
      .featured-discount {
        margin-top: 8px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
      
      .cart-totals {
        margin-bottom: 16px;
      }
      
      .subtotal, .discount-total {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 16px;
      }
      
      .subtotal {
        font-weight: 600;
      }
      
      .checkout-btn {
        width: 100%;
        background: ${settings.themeColor};
        color: white;
        border: none;
        padding: 14px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 12px;
      }
      
      .cart-footer-links {
        text-align: center;
      }
      
      .cart-footer-links a {
        color: #666;
        text-decoration: none;
        font-size: 14px;
      }
      
      .cart-message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        z-index: 10002;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      }
      
      .cart-message.show {
        transform: translateX(0);
      }
      
      .cart-message.success {
        background: #28a745;
      }
      
      .cart-message.error {
        background: #dc3545;
      }
      
      .cart-message.info {
        background: #17a2b8;
      }
      
      body.cart-drawer-open {
        overflow: hidden;
      }
      
      @media (max-width: 768px) {
        .sticky-cart-drawer {
          width: 100vw;
          ${settings.drawerPosition}: -100vw;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  // Inject sticky button styles
  function injectButtonStyles() {
    const styleId = 'sticky-button-styles';
    let styles = document.getElementById(styleId);
    
    if (styles) {
      styles.remove();
    }
    
    styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      .sticky-cart-button {
        position: fixed;
        z-index: 10000;
        background: ${settings.themeColor};
        color: white;
        border: none;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }
      
      .sticky-cart-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      }
      
      .sticky-cart-button.bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .sticky-cart-button.bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      .sticky-cart-button.top-right {
        top: 20px;
        right: 20px;
      }
      
      .sticky-cart-button.top-left {
        top: 20px;
        left: 20px;
      }
      
      .button-count {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
      }
      
      @media (max-width: 768px) {
        .sticky-cart-button {
          padding: 10px 16px;
          font-size: 13px;
        }
        
        .sticky-cart-button.bottom-right,
        .sticky-cart-button.bottom-left {
          bottom: 15px;
        }
        
        .sticky-cart-button.bottom-right {
          right: 15px;
        }
        
        .sticky-cart-button.bottom-left {
          left: 15px;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  // Check for settings updates periodically
  function checkForUpdates() {
    setInterval(async () => {
      try {
        const response = await fetch(`/apps/cart-drawer/api/settings?shop=${encodeURIComponent(shopDomain)}`);
        const data = await response.json();
        
        if (data.success && data.lastUpdated !== lastSettingsUpdate) {
          console.log('Settings updated, reinitializing cart drawer');
          settings = data.settings;
          lastSettingsUpdate = data.lastUpdated;
          
          // Reinitialize if cart is enabled/disabled
          if (settings.cartEnabled && !document.getElementById('sticky-cart-drawer')) {
            init();
          } else if (!settings.cartEnabled && document.getElementById('sticky-cart-drawer')) {
            enableNativeCart();
          } else if (settings.cartEnabled) {
            // Update existing drawer with new settings
            createDrawerHTML();
            createStickyButton();
          }
        }
      } catch (error) {
        console.error('Error checking for setting updates:', error);
      }
    }, 30000); // Check every 30 seconds
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      checkForUpdates();
    });
  } else {
    init();
    checkForUpdates();
  }

  // Expose public API
  window.StickyCartDrawer = {
    open: openDrawer,
    close: closeDrawer,
    refresh: loadCartData,
    updateSettings: (newSettings) => {
      settings = { ...settings, ...newSettings };
      createDrawerHTML();
      createStickyButton();
    }
  };

})();