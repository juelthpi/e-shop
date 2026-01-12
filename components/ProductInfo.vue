<template>
  <div class="product-info">
    
    
    <h1 class="product-title">{{ product.name }}</h1>
    
    <div class="rating-section">
      <span class="stars">★★★★★</span>
      <span class="rating-count">{{ product.ratingCount }} ratings</span>
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
              <img :src="color.swatchImg" :alt="color.name" />
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
import { computed } from 'vue';

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
  const basePrice = parseFloat(props.product.price.replace(/,/g, ''));
  const discount = props.product.discountPercentage || 0;
  const discountedPrice = basePrice * (1 - discount / 100);
  return (discountedPrice * quantity).toFixed(2);
});

const originalTotalPrice = computed(() => {
  const quantity = Math.max(1, props.quantity);
  const basePrice = parseFloat(props.product.price.replace(/,/g, ''));
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

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.product-info {
  flex: 1;
  padding: 0 20px;
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
  margin-bottom: 10px;
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
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #0f1111;
}

.color-swatches {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.swatch {
  width: 45px;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 2px;
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
  min-width: 45px;
  height: 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 10px;
  font-size: 13px;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  width: fit-content;
}

.qty-btn {
  width: 35px;
  height: 35px;
  background: #f0f2f2;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.qty-btn:hover {
  background: #e3e6e6;
}

.qty-input {
  width: 50px;
  height: 35px;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
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
</style>
