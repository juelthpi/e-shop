<template>
  <Transition name="fade">
    <div v-if="isQuickViewOpen" class="quickview-overlay" @click.self="closeQuickView">
      <Transition name="slide-up">
        <div v-if="quickViewProduct" class="quickview-modal shadow-lg">
          <!-- Close Button -->
          <button class="close-btn" @click="closeQuickView" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="quickview-content">
            <div class="row g-0 h-100">
              <!-- Product Image Section -->
              <div class="col-lg-6 bg-light d-flex align-items-center justify-content-center p-4 product-img-col">
                <div class="img-container">
                  <Transition name="fade-in" mode="out-in">
                    <img :key="displayImage" :src="displayImage" alt="Product" class="img-fluid rounded-4 shadow-sm">
                  </Transition>
                </div>
              </div>

              <!-- Product Details Section -->
              <div class="col-lg-6">
                <div class="p-4 p-md-5 product-info-col">
                  <h2 class="fw-bold product-title mb-2">{{ quickViewProduct.name }}</h2>
                  
                  <!-- Price Section -->
                  <div class="d-flex align-items-center gap-3 mb-4">
                    <span class="fs-2 fw-bold text-brand">৳{{ quickViewProduct.price }}</span>
                    <del v-if="quickViewProduct.oldPrice" class="text-muted fs-5">৳{{ quickViewProduct.oldPrice }}</del>
                    <span v-if="quickViewProduct.discount" class="badge-discount px-2 py-1 rounded small fw-bold">
                        {{ quickViewProduct.discount }}
                    </span>
                  </div>

                  <hr class="my-4">

                  <div v-if="quickViewProduct.colors?.length" class="mb-4">
                    <p class="section-label mb-3">Color: <strong>{{ selectedColor?.name || 'Select' }}</strong></p>
                    <div class="d-flex flex-wrap gap-2">
                      <div 
                        v-for="color in quickViewProduct.colors" 
                        :key="color.id"
                        class="variant-thumb"
                        :class="{ active: selectedColor?.id === color.id }"
                        @click="selectedColor = color"
                      >
                        <img :src="color.images?.[0] || color.swatchImg" :alt="color.name">
                      </div>
                    </div>
                  </div>

                  <div v-if="quickViewProduct.sizes?.length" class="mb-4">
                    <p class="section-label mb-3">Size: <strong>{{ selectedSize || 'Select' }}</strong></p>
                    <div class="d-flex flex-wrap gap-2">
                      <button 
                        v-for="size in quickViewProduct.sizes" 
                        :key="size"
                        class="size-option-btn"
                        :class="{ active: selectedSize === size }"
                        @click="selectedSize = size"
                      >
                        {{ size }}
                      </button>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="mb-4">
                    <p class="section-label mb-3">Quantity</p>
                    <div class="quantity-selector">
                      <button class="qty-btn" @click="quantity > 1 && quantity--">-</button>
                      <input type="number" v-model.number="quantity" min="1" class="qty-input">
                      <button class="qty-btn" @click="quantity++">+</button>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="mt-5 d-flex flex-column gap-3">
                    <button 
                      class="btn-add-to-cart py-3 rounded-pill fw-bold"
                      :disabled="isAddToCartDisabled"
                      @click="handleAddToCart"
                    >
                      <i class="fa-solid fa-cart-shopping me-2"></i>
                      {{ isAddToCartDisabled ? 'Select Options' : 'Add to Cart' }}
                    </button>
                    <NuxtLink 
                      :to="'/product-details'" 
                      class="btn-view-details text-center py-2 text-decoration-none text-muted"
                      @click="closeQuickView"
                    >
                      View Full Details <i class="fa-solid fa-arrow-right-long ms-1"></i>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Success Alert -->
          <Transition name="pop">
            <div v-if="showSuccess" class="quickview-success-alert shadow">
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-circle-check text-success fa-xl"></i>
                <span class="fw-bold fs-5">Successfully Added!</span>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const { isQuickViewOpen, quickViewProduct, closeQuickView } = useQuickView()
const { addToCart } = useCart()

const selectedColor = ref(null)
const selectedSize = ref(null)
const quantity = ref(1)
const showSuccess = ref(false)

// Reset selection when product changes
watch(quickViewProduct, (newVal) => {
    if (newVal) {
        selectedColor.value = newVal.colors?.length ? null : null
        selectedSize.value = newVal.sizes?.length ? null : null
        showSuccess.value = false
    }
})

const displayImage = computed(() => {
    return selectedColor.value?.images?.[0] || quickViewProduct.value?.image
})

const isAddToCartDisabled = computed(() => {
    if (!quickViewProduct.value) return true
    const hasColors = quickViewProduct.value.colors?.length > 0
    const hasSizes = quickViewProduct.value.sizes?.length > 0
    return (hasColors && !selectedColor.value) || (hasSizes && !selectedSize.value)
})

const handleAddToCart = () => {
    if (isAddToCartDisabled.value) return

    addToCart(quickViewProduct.value, selectedColor.value, selectedSize.value, quantity.value)
    
    showSuccess.value = true
    setTimeout(() => {
        showSuccess.value = false
        closeQuickView()
    }, 1500)
}
</script>

<style scoped>
.quickview-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.quickview-modal {
    background: white;
    width: 95%;
    max-width: 100rem;
    height: auto;
    max-height: 90vh;
    border-radius: 3.2rem;
    position: relative;
    overflow: hidden;
    display: flex;
}

.close-btn {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 0 0.4rem 1.5rem rgba(0,0,0,0.1);
    z-index: 100;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 1.2rem;
}

.close-btn:hover {
    transform: rotate(90deg);
    background: #f8f9fa;
    color: var(--brand);
}

.quickview-content {
    width: 100%;
    overflow-y: auto;
}

.img-container {
    width: 100%;
    max-width: 40rem;
    perspective: 100rem;
}

.img-container img {
    width: 100%;
    height: auto;
    object-fit: contain;
    transition: transform 0.5s ease;
}

.product-title {
    font-size: 2.2rem;
    color: #1a1a1a;
    letter-spacing: -0.5px;
}

.badge-discount {
    background: #fff0f0;
    color: #ff4d4d;
    border: 1px solid #ffcccc;
}

.section-label {
    font-weight: 600;
    font-size: 1.6rem;
    color: #1a1a1a;
}

.section-label strong {
    color: var(--brand);
    font-weight: 700;
}

/* Variant Thumbnails */
.variant-thumb {
    width: 6rem;
    height: 6rem;
    border: 0.2rem solid #f0f0f0;
    border-radius: 1.2rem;
    padding: 0.3rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    background: white;
}

.variant-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.variant-thumb:hover {
    border-color: var(--brand);
    transform: translateY(-2px);
}

.variant-thumb.active {
    border-color: var(--brand);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: scale(1.05);
}

/* Quantity Selector - Synced with Details Page */
.quantity-selector {
  display: flex;
  align-items: center;
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  width: fit-content;
}

.qty-btn {
  width: 3.5rem;
  height: 3.5rem;
  background: #f0f2f2;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #e3e6e6;
}

.qty-input {
  width: 5rem;
  height: 3.5rem;
  border: none;
  border-left: 0.1rem solid #ddd;
  border-right: 0.1rem solid #ddd;
  text-align: center;
  font-size: 1.4rem;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Size Buttons */
.size-option-btn {
    min-width: 5rem;
    height: 4.5rem;
    border-radius: 1.2rem;
    border: 0.1rem solid #e0e0e0;
    background: white;
    font-weight: 600;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem;
}

.size-option-btn:hover:not(.active) {
    border-color: var(--brand);
    color: var(--brand);
}

.size-option-btn.active {
    background: var(--brand);
    color: white;
    border-color: var(--brand);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* Add to Cart Button */
.btn-add-to-cart {
    background: var(--brand);
    color: white;
    border: none;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-add-to-cart:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    filter: brightness(1.1);
}

.btn-add-to-cart:disabled {
    background: #eee;
    color: #999;
    cursor: not-allowed;
}

.btn-view-details:hover {
    color: var(--brand) !important;
}

/* Success Alert */
.quickview-success-alert {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2.5rem 4.5rem;
    border-radius: 2rem;
    z-index: 1002;
    border: 0.2rem solid #28a745;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.slide-up-enter-from { transform: translateY(60px); opacity: 0; }
.slide-up-leave-to { transform: translateY(30px); opacity: 0; }

.fade-in-enter-active { transition: opacity 0.5s ease; }
.fade-in-enter-from { opacity: 0; }

.pop-enter-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { transition: all 0.3s ease; }
.pop-enter-from { transform: translate(-50%, -30%) scale(0.8); opacity: 0; }
.pop-leave-to { transform: translate(-50%, -70%) scale(0.9); opacity: 0; }

@media (max-width: 99.1rem) {
    .quickview-modal {
        max-width: calc(100% - 3rem);
        max-height: 90vh;
        border-radius: 2rem;
    }
    .product-img-col {
  
        padding: 1.5rem !important;
    }
    .product-info-col {
        padding: 2.5rem !important;
    }
    .product-title {
        font-size: 1.8rem;
    }
    .variant-thumb {
        width: 5rem;
        height: 5rem;
    }
    .quantity-selector .qty-btn {
        width: 3.2rem;
        height: 3.2rem;
    }
    .quantity-selector .qty-input {
        width: 4rem;
        height: 3.2rem;
    }
}

@media (max-width: 57.6rem) {
    .variant-thumb {
        width: 4.5rem;
        height: 4.5rem;
    }
    .section-label {
        font-size: 1.4rem;
    }
}
</style>
