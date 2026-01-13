<template>
  <div>
    <!-- Overlay -->
    <Transition name="fade">
      <div v-if="isCartOpen" class="cart-overlay" @click="toggleCartDrawer"></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div v-if="isCartOpen" class="cart-drawer d-flex flex-column">
        <!-- Header -->
        <div class="drawer-header p-3 d-flex justify-content-between align-items-center border-bottom">
          <h5 class="mb-0 fw-bold">Shopping Cart</h5>
          <button class="close-btn" @click="toggleCartDrawer">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="drawer-body flex-grow-1 p-3 overflow-auto">
          <div v-if="cart.length === 0" class="text-center py-5">
            <i class="fa-solid fa-cart-shopping fa-3x text-muted mb-3 d-block"></i>
            <p class="text-muted">Your cart is empty</p>
            <button class="primary-btn w-100 justify-content-center px-4 mt-3" @click="toggleCartDrawer">Start Shopping</button>
          </div>

          <div v-else class="cart-items d-flex flex-column gap-4">
            <div v-for="item in cart" :key="item.cartItemId" class="cart-item d-flex gap-3">
              <div class="item-img rounded-3 overflow-hidden border bg-light d-flex align-items-center justify-content-center">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="w-100 h-100 object-fit-cover">
                <i v-else class="fa-solid fa-image text-muted opacity-50"></i>
              </div>
              <div class="item-details flex-grow-1">
                <p class="mb-1 pe-4 position-relative fw-medium text-black">{{ item.name }}</p>
                <p class="text-muted small mb-2">{{ item.color?.name || 'Default' }} | {{ item.size || 'N/A' }}</p>
                <p class="fw-regular mb-3 text-black">${{ (parseFloat(item.price.toString().replace(/[^\d.]/g, '')) * item.quantity).toFixed(2) }}</p>
                
                <div class="d-flex justify-content-between align-items-center">
                  <div class="qty-selector d-flex align-items-center gap-3">
                    <button class="qty-btn" @click="updateQuantity(item.cartItemId, -1)">
                      <i class="fa-solid fa-circle-minus"></i>
                    </button>
                    <span class="qty-count fw-bold text-muted">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="updateQuantity(item.cartItemId, 1)">
                      <i class="fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                  <button class="remove-btn d-flex align-items-center gap-1" @click="removeFromCart(item.cartItemId)">
                    <i class="fa-regular fa-trash-can"></i>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cart.length > 0" class="drawer-footer p-3 border-top bg-white">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-medium text-black">Subtotal</h6>
            <h6 class="mb-0 fw-medium text-black">${{ subtotal.toFixed(2) }}</h6>
          </div>
          <NuxtLink to="/checkout" class="primary-btn w-100 py-3 rounded-pill fw-bold text-uppercase mb-2 text-decoration-none d-flex justify-content-center" @click="toggleCartDrawer">
            Process to Checkout
          </NuxtLink>
          <p class="text-muted text-center small mb-0 mt-2 px-4" style="font-size: 11px;">
             Shipping, Taxes & Discount Calculate At Checkout
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const { cart, isCartOpen, toggleCartDrawer, removeFromCart, updateQuantity, subtotal } = useCart()
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2000;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100%;
  background: #fff;
  z-index: 2001;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
}

@media (max-width: 576px) {
  .cart-drawer {
    width: 100%;
  }
}

.drawer-header {
    padding: 20px !important;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: var(--brand);
  padding: 0;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: rotate(90deg);
}

.item-img {
  width: 85px;
  height: 85px;
  flex-shrink: 0;
}

.qty-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: rgba(62, 54, 54, 0.389);
  padding: 0;
  display: flex;
  align-items: center;
}

.qty-count {
  font-size: 14px;
  min-width: 15px;
  text-align: center;
}

.remove-btn {
  background: color-mix(in srgb, var(--brand) 8%, transparent); /* Light brand tint */
  border: none;
  color: #ff4d4d;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 20px;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: color-mix(in srgb, var(--brand) 15%, transparent);
}

 

.primary-btn:hover {
    opacity: 0.9;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

.drawer-footer {
    padding: 25px 20px 40px !important;
    background: #fff !important;
}
</style>
