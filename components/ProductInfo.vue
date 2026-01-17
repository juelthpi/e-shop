<template>
  <div class="product-info">
    
    
    <h1 class="product-title">{{ product.name }}</h1>
    
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div class="rating-section mb-0">
        <span class="stars">★★★★★</span>
        <span class="rating-count">{{ product.ratingCount }} ratings</span>
      </div>

      <!-- Share System -->
      <div class="position-relative" v-outside-click="closeShare">
        <button 
          class="share-btn" 
          :class="{ active: showShareMenu }"
          @click="toggleShare" 
          title="Share Product"
        >
          <i class="fa-solid fa-share-nodes"></i>
        </button>

        <Transition name="fade-up">
          <div v-if="showShareMenu" class="share-dropdown shadow-lg">
             <div class="share-header">Share via</div>
             <div class="share-options">
                <a :href="facebookShare" target="_blank" class="share-item fb" title="Facebook">
                   <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a :href="twitterShare" target="_blank" class="share-item tw" title="Twitter">
                   <i class="fa-brands fa-x-twitter"></i>
                </a>
                <a :href="whatsappShare" target="_blank" class="share-item wa" title="WhatsApp">
                   <i class="fa-brands fa-whatsapp"></i>
                </a>
                <button class="share-item cp" @click="copyLink" title="Copy Link">
                   <i class="fa-regular fa-copy" v-if="!copied"></i>
                   <i class="fa-solid fa-check text-success" v-else></i>
                </button>
             </div>
             <div class="share-footer" v-if="copied">
                Link Copied!
             </div>
          </div>
        </Transition>
      </div>
    </div>
    
    <hr />

    <div class="price-section">
      <div v-if="product.offerEndTime" class="offer-timer mb-2">
        <span class="timer-badge">Ends in {{ timeLeft }}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="discount-badge" v-if="product.discountPercentage">-{{ product.discountPercentage }}%</span>
        <div class="d-flex align-items-start">
           <span class="currency">$</span>
           <span class="price big-price">{{ formattedPrice }}</span>
        </div>
      </div>
      <div v-if="product.discountPercentage" class="text-gray sm-price">
        List Price: <del>${{ originalTotalPrice }}</del>
      </div>
    </div>

    <div class="d-flex align-items-center gap-2 flex-wrap">
       <div class="color-selection">
          <p class="section-label">Color: <strong>{{ selectedColorName }}</strong></p>
          <div class="color-swatches">
            <div
              v-for="color in product.colors"
              :key="color.id"
              :class="['swatch', { active: selectedColorId === color.id }]"
              @click="$emit('color-selected', color.id)"
            >
              <img :src="color.images?.[0] || color.swatchImg" :alt="color.name" />
            </div>
          </div>
        </div>
        <!-- Size -->
        <div class="size-selection mb-3">
          <p class="section-label">Size: <strong>{{ selectedSize }}</strong></p>
          <div class="size-swatches">
            <div
              v-for="size in product.sizes"
              :key="size"
              :class="['size-box', { active: selectedSize === size }]"
              @click="$emit('size-selected', size)"
            >
              <span>{{ size }}</span>
            </div>
          </div>
        </div>
        <!-- Quantity -->
        <div class="quantity-selection mb-3">
          <p class="section-label">Quantity</p>
          <div class="quantity-selector">
             <button class="qty-btn" @click="updateQty(quantity - 1)">-</button>
             <input 
              type="number" 
              :value="quantity" 
              @input="onQtyInput"
              class="qty-input" 
              min="1"
             />
             <button class="qty-btn" @click="updateQty(quantity + 1)">+</button>
          </div>
        </div>
    </div>

    <div class="description-section">
      <p class="section-label">About this item</p>
      <ul class="bullet-points">
        <li v-for="(point, index) in product.features" :key="index">
          {{ point }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  selectedColorId: {
    type: String,
    required: true,
  },
  selectedSize: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['color-selected', 'size-selected', 'update:quantity']);

const updateQty = (val) => {
  let newValue = parseInt(val);
  if (isNaN(newValue) || newValue < 1) newValue = 1;
  emit('update:quantity', newValue);
};

const onQtyInput = (e) => {
  updateQty(e.target.value);
};

const selectedColorName = computed(() => {
  const color = props.product.colors.find(c => c.id === props.selectedColorId);
  return color ? color.name : '';
});

const formattedPrice = computed(() => {
  const quantity = Math.max(1, props.quantity);
  const basePrice = parseFloat(props.product.price.toString().replace(/,/g, ''));
  // If we have discountPercentage, apply it. Otherwise use the price as is.
  const discount = props.product.discountPercentage || 0;
  const discountedPrice = basePrice * (1 - discount / 100);
  return (discountedPrice * quantity).toFixed(2);
});

const originalTotalPrice = computed(() => {
  const quantity = Math.max(1, props.quantity);
  const basePrice = parseFloat(props.product.price.toString().replace(/,/g, ''));
  return (basePrice * quantity).toFixed(2);
});

// Timer Logic
const timeLeft = ref('');
let timerInterval = null;

const updateTimer = () => {
  if (!props.product.offerEndTime) return;
  const end = new Date(props.product.offerEndTime).getTime();
  const now = new Date().getTime();
  const diff = end - now;

  if (diff <= 0) {
    timeLeft.value = 'Expired';
    return;
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timeLeft.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Share Logic
const showShareMenu = ref(false);
const copied = ref(false);

const currentUrl = ref('');

const toggleShare = () => {
  showShareMenu.value = !showShareMenu.value;
  if(showShareMenu.value) copied.value = false;
};

const closeShare = () => {
  showShareMenu.value = false;
};

const facebookShare = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`);
const twitterShare = computed(() => `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(props.product.name)}`);
const whatsappShare = computed(() => `https://api.whatsapp.com/send?text=${encodeURIComponent(props.product.name + ' ' + currentUrl.value)}`);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value);
    copied.value = true;
    setTimeout(() => {
       copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

// Custom Directive for clicking outside
const vOutsideClick = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
  // Set current URL on mount (client-side)
  if (typeof window !== 'undefined') {
    currentUrl.value = window.location.href;
  }
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.product-info {
  flex: 1;
}

.breadcrumb {
  font-size: 12px;
  color: #565959;
  margin-bottom: 20px;
}

.product-title {
  font-size: 22px;
  font-weight: 500;
  line-height:28px;
  margin-bottom:4px;
  color: #0f1111;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Removed margin-bottom here as it's handled in wrapper now */
}

.stars {
  color: #ffa41c;
  font-size: 18px;
}

.rating-count {
  font-size: 14px;
  color: #007185;
}

hr {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 15px 0;
}

.price-section {
  margin-bottom: 20px;
}

.currency {
  font-size: 13px;
  vertical-align: top;
  margin-top: 4px;
  display: inline-block;
}

.price {
  font-size: 28px;
  font-weight: 500;
}

.section-label {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0f1111;
}

.color-swatches {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.swatch {
  width: 4.5rem;
  height: 4.5rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  overflow: hidden;
  cursor: pointer;
  padding: 0.2rem;
  transition: all 0.2s;
}

.swatch:hover {
  border-color: #e77600;
}

.swatch.active {
  border-color: #e77600;
  box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
}

.swatch img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bullet-points {
  padding-left: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #0f1111;
}

.bullet-points li {
  margin-bottom: 5px;
}
.bullet-points li {
  margin-bottom: 5px;
}

.size-swatches {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-box {
  min-width: 4.5rem;
  height: 3.5rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.4rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 1rem;
  font-size: 1.3rem;
  transition: all 0.2s;
}

.size-box:hover {
  background-color: #f7faff;
  border-color: #e77600;
}

.size-box.active {
  border-color: #e77600;
  box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
  font-weight: 600;
  background-color: #fffaf6;
}
.size-box.active {
  border-color: #e77600;
  box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
  font-weight: 600;
  background-color: #fffaf6;
}

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
  /* Hide arrows */
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.offer-timer .timer-badge {
  background-color:var(--brand);
  color: white;
  padding: 4px 8px;
  font-weight: 700;
  font-size: 14px;
  border-radius: 4px;
}

.discount-badge {
  color: #CC0C39;
  font-size: 26px;
  font-weight: 300;
}

.big-price {
  font-size: 28px;
  line-height: normal;
}

.sm-price {
  font-size: 13px;
}

/* Share System Styles */
.share-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #eee;
  background: white;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.share-btn:hover, .share-btn.active {
  background: #f5f5f5;
  color: var(--brand);
  border-color: var(--brand);
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.share-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  width: 250px;
  z-index: 100;
  border: 1px solid #f0f0f0;
}

.share-dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 14px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
}

.share-header {
  font-size: 13px;
  font-weight: 600;
  color: #999;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 8px;
}

.share-item {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #f8f9fa;
  color: #333;
  font-size: 18px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  text-decoration: none;
}

.share-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.share-item.fb:hover { background: #e7f5ff; color: #1877f2; }
.share-item.tw:hover { background: #eff3f4; color: #000; }
.share-item.wa:hover { background: #dcf8c6; color: #25d366; }
.share-item.cp:hover { background: #e9ecef; color: #495057; }

.share-footer {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand);
  margin-top: 8px;
  background: #f9f9f9;
  padding: 4px;
  border-radius: 6px;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
