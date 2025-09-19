
class OptimizedStickyCartDrawer {
  constructor(settings) {
    this.isOpen = false;
    this.cartData = null;
    this.shopDomain = null;
    this.upsells = [];
    this.addons = [];
    this.isPreview = false;
    this.settings = settings;
    this.init();
  }

  async init() {
    console.log('[Sticky Cart] Initializing optimized cart drawer...');
    this.determineShopDomain();

    if (!this.shopDomain) {
      console.warn('Unable to determine shop domain, cart drawer disabled');
      return;
    }

    if (!this.settings?.cartDrawerEnabled) {
      console.log('Cart drawer disabled in settings');
      return;
    }

    this.createStickyButton();
    this.createCartDrawer();
    this.bindEvents();
    this.exposeGlobalMethods();
    this.loadCartData();
    console.log('[Sticky Cart] Optimized initialization complete!');
  }

  determineShopDomain() {
    const urlParams = new URLSearchParams(window.location.search);
    const shopParam = urlParams.get('shop');
    if (shopParam) {
      this.shopDomain = shopParam;
      return;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('lovable.app')) {
      this.isPreview = true;
      this.shopDomain = 'demo-shop.myshopify.com';
      return;
    }
    this.shopDomain = window.Shopify?.shop || window.SHOP_DOMAIN || window.location.hostname;
    if (this.shopDomain.endsWith('.myshopify.com')) {
      localStorage.setItem('shop_domain', this.shopDomain);
    }
  }

  formatCurrency(amount) {
    const value = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    const currency = this.settings?.currency || 'USD';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 2 }).format(value);
    } catch {
      return `${currency} ${value.toFixed(2)}`;
    }
  }

  async loadCartData() {
    try {
      if (this.isPreview) {
        this.cartData = { items: [{ id: 1, title: 'Premium Wireless Headphones', variant_title: 'Black', price: 12999, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' }], total_price: 12999, item_count: 1, currency: 'USD' };
        this.updateUI();
        return;
      }
      const response = await fetch('/cart.js');
      if (!response.ok) throw new Error('Cart fetch failed');
      this.cartData = await response.json();
      this.updateUI();
    } catch (error) {
      console.error('Failed to load cart data:', error);
    }
  }

  createStickyButton() {
    if (!this.settings?.stickyButton?.enabled) return;
    const existing = document.querySelector('.sticky-cart-button[data-cart-source="optimized"]');
    if (existing) existing.remove();

    const button = document.createElement('button');
    button.className = 'sticky-cart-button';
    button.setAttribute('data-cart-source', 'optimized');
    const position = this.settings.stickyButton.position || 'bottom-right';
    const positionStyles = { 'bottom-right': { bottom: '20px', right: '20px' }, 'bottom-left': { bottom: '20px', left: '20px' }, 'top-right': { top: '20px', right: '20px' }, 'top-left': { top: '20px', left: '20px' } };
    button.style.cssText = `
      position: fixed; z-index: 9999; padding: 12px 16px; background: ${this.settings?.themeColor || '#3B82F6'}; color: white; border: none; border-radius: 50px; cursor: pointer; font-family: inherit; font-weight: 500; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease; ${Object.entries(positionStyles[position] || positionStyles['bottom-right']).map(([k, v]) => `${k}: ${v}`).join('; ')};
    `;
    const itemCount = this.cartData?.item_count || 0;
    button.innerHTML = `<span>🛒</span><span>${this.settings.stickyButton.text || 'Cart'}</span>${itemCount > 0 ? `<span style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 10px; font-size: 12px;">${itemCount}</span>` : ''}`;
    button.addEventListener('click', () => this.openDrawer());
    document.body.appendChild(button);
    this.stickyButton = button;
  }

  createCartDrawer() {
    if (!document.getElementById('optimized-cart-styles')) {
      const style = document.createElement('style');
      style.id = 'optimized-cart-styles';
      style.textContent = `
        .optimized-cart-drawer { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; pointer-events: none; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .optimized-cart-drawer.open { pointer-events: auto; opacity: 1; visibility: visible; }
        .optimized-cart-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); }
        .optimized-cart-panel { position: absolute; top: 0; right: 0; width: 400px; max-width: 90vw; height: 100%; background: white; transform: translateX(100%); transition: transform 0.3s ease; display: flex; flex-direction: column; box-shadow: -4px 0 16px rgba(0,0,0,0.15); }
        .optimized-cart-drawer.open .optimized-cart-panel { transform: translateX(0); }
        .cart-item { display: flex; align-items: center; gap: 12px; padding: 16px; border-bottom: 1px solid #eee; }
        .cart-item img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; }
        .cart-item-details { flex: 1; min-width: 0; }
        .cart-item-title { font-weight: 500; margin: 0 0 4px 0; }
        .cart-item-price { font-size: 14px; color: #666; }
      `;
      document.head.appendChild(style);
    }
    const drawer = document.createElement('div');
    drawer.className = 'optimized-cart-drawer';
    drawer.innerHTML = `
      <div class="optimized-cart-overlay"></div>
      <div class="optimized-cart-panel">
        <div style="padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Your Cart</h2>
          <button class="close-btn" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div class="cart-body" style="flex: 1; overflow-y: auto; padding: 20px;">
          <div class="cart-items"></div>
          <div class="cart-features"></div>
        </div>
        <div class="cart-footer" style="padding: 20px; border-top: 1px solid #eee; background: white;">
          <div class="cart-total" style="margin-bottom: 15px; text-align: right;"></div>
          <button class="checkout-btn" style="width: 100%; padding: 15px; background: ${this.settings?.themeColor || '#3B82F6'}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
            ${this.isPreview ? 'Checkout (Preview)' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
    this.drawer = drawer;
    drawer.querySelector('.close-btn').addEventListener('click', () => this.closeDrawer());
    drawer.querySelector('.optimized-cart-overlay').addEventListener('click', () => this.closeDrawer());
    drawer.querySelector('.checkout-btn').addEventListener('click', () => { if (!this.isPreview) window.location.href = '/checkout'; });
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('[href*="/cart"]') || target.matches('[data-cart-drawer]') || target.matches('.cart-toggle') || target.matches('.js-cart-link')) {
        if (!target.closest('[data-cart-source="optimized"]')) {
          e.preventDefault();
          e.stopPropagation();
          this.openDrawer();
          console.log('[Sticky Cart] Blocked native cart interaction, opening our drawer');
        }
      }
    }, true);
  }

  exposeGlobalMethods() {
    window.stickyCartDrawer = { openDrawer: () => this.openDrawer(), closeDrawer: () => this.closeDrawer(), toggleDrawer: () => this.toggleDrawer(), updateItemCount: (count) => this.updateItemCount(count), isOptimized: true };
  }

  openDrawer() {
    if (!this.drawer) return;
    this.isOpen = true;
    this.drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-sticky-cart-open', 'true');
    this.loadCartData();
    console.log('[Sticky Cart] Drawer opened');
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.isOpen = false;
    this.drawer.classList.remove('open');
    document.body.style.overflow = '';
    document.body.removeAttribute('data-sticky-cart-open');
    console.log('[Sticky Cart] Drawer closed');
  }

  toggleDrawer() {
    this.isOpen ? this.closeDrawer() : this.openDrawer();
  }

  updateUI() {
    if (!this.cartData || !this.drawer) return;
    const itemCount = this.cartData.item_count || 0;
    const total = this.cartData.total_price || 0;
    if (this.stickyButton) {
      const countSpan = this.stickyButton.querySelector('span:last-child');
      if (itemCount > 0) {
        countSpan.textContent = itemCount;
        countSpan.style.display = 'inline';
      } else {
        countSpan.style.display = 'none';
      }
    }
    const itemsContainer = this.drawer.querySelector('.cart-items');
    if (itemCount === 0) {
      itemsContainer.innerHTML = `<div style="text-align: center; padding: 40px 20px;"><div style="font-size: 48px; margin-bottom: 16px;">🛒</div><h3 style="margin: 0 0 8px 0; font-size: 18px;">Your cart is empty</h3><p style="margin: 0; color: #666;">Add some items to get started!</p></div>`;
    } else {
      itemsContainer.innerHTML = this.cartData.items.map(item => `<div class="cart-item"><img src="${item.image || '/placeholder.svg'}" alt="${item.title}" /><div class="cart-item-details"><h4 class="cart-item-title">${item.title}</h4>${item.variant_title ? `<p style="font-size: 12px; color: #666; margin: 0;">${item.variant_title}</p>` : ''}<p class="cart-item-price">${this.formatCurrency(item.price / 100)} × ${item.quantity}</p></div></div>`).join('');
    }
    this.drawer.querySelector('.cart-total').innerHTML = `<div style="font-size: 18px; font-weight: 600;">Total: ${this.formatCurrency(total / 100)}</div>`;
    this.updateFeatures();
  }

  updateFeatures() {
    const featuresContainer = this.drawer.querySelector('.cart-features');
    let featuresHTML = '';
    if (this.settings?.freeShipping?.enabled) {
      const threshold = this.settings.freeShipping.threshold;
      const current = (this.cartData?.total_price || 0) / 100;
      const progress = Math.min((current / threshold) * 100, 100);
      const remaining = Math.max(threshold - current, 0);
      featuresHTML += `
        <div style="margin: 20px 0; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
            <span>Free shipping progress</span>
            <span>${Math.round(progress)}%</span>
          </div>
          <div style="width: 100%; height: 6px; background: #e9ecef; border-radius: 3px; overflow: hidden;">
            <div style="height: 100%; background: ${this.settings?.themeColor || '#3B82F6'}; width: ${progress}%; transition: width 0.3s ease;"></div>
          </div>
          <p style="margin: 8px 0 0 0; font-size: 14px; text-align: center;">
            ${remaining > 0 ? `Add ${this.formatCurrency(remaining)} more for free shipping!` : '🎉 You qualify for free shipping!'}
          </p>
        </div>
      `;
    }
    featuresContainer.innerHTML = featuresHTML;
  }

  updateItemCount(count) {
    if (this.stickyButton) {
      const countSpan = this.stickyButton.querySelector('span:last-child');
      if (count > 0) {
        countSpan.textContent = count;
        countSpan.style.display = 'inline';
      } else {
        countSpan.style.display = 'none';
      }
    }
  }
}

function initializeCartDrawer() {
  if (window.STICKY_CART_SETTINGS) {
    new OptimizedStickyCartDrawer(window.STICKY_CART_SETTINGS);
  } else {
    console.warn('[Sticky Cart] Settings not found, awaiting load event.');
    document.addEventListener('stickyCartSettingsLoaded', () => {
       console.log('[Sticky Cart] Settings loaded, initializing now.');
       new OptimizedStickyCartDrawer(window.STICKY_CART_SETTINGS);
    }, { once: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCartDrawer);
} else {
  initializeCartDrawer();
}
