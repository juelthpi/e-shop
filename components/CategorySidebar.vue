<template>
  <div class="">
    <!-- Sort By Section -->
    <div class="filter-section">
      <div class="filter-header" @click="toggleSection('sortBy')">
        <h6>Sort By</h6>
        <i :class="['fa-solid fa-angle-down transition-icon', { 'rotate-180': activeSections.sortBy }]"></i>
      </div>
      <div class="filter-content-wrapper" :class="{ 'is-open': activeSections.sortBy }">
        <div class="filter-content">
          <label v-for="option in sortOptions" :key="option.value" class="radio-container">
            <input type="radio" v-model="filters.sortBy" :value="option.value" />
            <span class="checkmark"></span>
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>

    <!-- Price Section -->
    <div class="filter-section">
      <div class="filter-header" @click="toggleSection('price')">
        <h6>Price</h6>
        <i :class="['fa-solid fa-angle-down transition-icon', { 'rotate-180': activeSections.price }]"></i>
      </div>
      <div class="filter-content-wrapper" :class="{ 'is-open': activeSections.price }">
        <div class="filter-content">
          <div class="price-inputs d-flex gap-2 mb-3">
            <input type="number" v-model="filters.minPrice" class="price-input" placeholder="Min" min="0" />
            <input type="number" v-model="filters.maxPrice" class="price-input" placeholder="Max" min="0" />
          </div>
          <div class="price-slider-container">
            <div class="range-slider">
              <div class="range-track" :style="trackStyle"></div>
              <input type="range" v-model="filters.minPrice" :min="minLimit" :max="maxLimit" class="range-input" />
              <input type="range" v-model="filters.maxPrice" :min="minLimit" :max="maxLimit" class="range-input" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Brand Section -->
    <div class="filter-section">
      <div class="filter-header" @click="toggleSection('brand')">
        <h6>Brand</h6>
        <i :class="['fa-solid fa-angle-down transition-icon', { 'rotate-180': activeSections.brand }]"></i>
      </div>
      <div class="filter-content-wrapper" :class="{ 'is-open': activeSections.brand }">
        <div class="filter-content">
          <TransitionGroup name="list" tag="div">
            <label v-for="brand in visibleBrands" :key="brand" class="checkbox-container">
              <input type="checkbox" v-model="filters.brands" :value="brand" />
              <span class="checkmark"></span>
              {{ brand }}
            </label>
          </TransitionGroup>
          <button v-if="brands.length > 8" class="see-more-btn" @click.stop="toggleSeeMore('brand')">
            {{ expandedSections.brand ? 'See Less' : 'See More' }}
            <i :class="['fa-solid ms-1 transition-icon', { 'rotate-180': expandedSections.brand }]"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Color Section -->
    <div class="filter-section">
      <div class="filter-header" @click="toggleSection('color')">
        <h6>Color</h6>
        <i :class="['fa-solid fa-angle-down transition-icon', { 'rotate-180': activeSections.color }]"></i>
      </div>
      <div class="filter-content-wrapper" :class="{ 'is-open': activeSections.color }">
        <div class="filter-content">
          <TransitionGroup name="list" tag="div">
            <label v-for="color in visibleColors" :key="color" class="checkbox-container">
              <input type="checkbox" v-model="filters.colors" :value="color" />
              <span class="checkmark"></span>
              {{ color }}
            </label>
          </TransitionGroup>
          <button v-if="colors.length > 8" class="see-more-btn" @click.stop="toggleSeeMore('color')">
            {{ expandedSections.color ? 'See Less' : 'See More' }}
            <i :class="['fa-solid ms-1 transition-icon', { 'rotate-180': expandedSections.color }]"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Size Section -->
    <div class="filter-section">
      <div class="filter-header" @click="toggleSection('size')">
        <h6>Size</h6>
        <i :class="['fa-solid fa-angle-down transition-icon', { 'rotate-180': activeSections.size }]"></i>
      </div>
      <div class="filter-content-wrapper" :class="{ 'is-open': activeSections.size }">
        <div class="filter-content">
          <TransitionGroup name="list" tag="div">
            <label v-for="size in visibleSizes" :key="size" class="checkbox-container">
              <input type="checkbox" v-model="filters.sizes" :value="size" />
              <span class="checkmark"></span>
              {{ size }}
            </label>
          </TransitionGroup>
          <button v-if="sizes.length > 8" class="see-more-btn" @click.stop="toggleSeeMore('size')">
            {{ expandedSections.size ? 'See Less' : 'See More' }}
            <i :class="['fa-solid ms-1 transition-icon', { 'rotate-180': expandedSections.size }]"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const activeSections = reactive({
  sortBy: true,
  price: true,
  brand: true,
  color: true,
  size: true
})

const expandedSections = reactive({
  brand: false,
  color: false,
  size: false
})

const filters = reactive({
  sortBy: 'newest',
  minPrice: 5,
  maxPrice: 108,
  brands: [],
  colors: [],
  sizes: []
})

const minLimit = 0
const maxLimit = 200

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price Low To High', value: 'price-asc' },
  { label: 'Price High To Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'top-rated' }
]

const brands = ref(['Levi\'s', 'Puma', 'Babymel', 'Burberry', 'Gucci', 'Adidas', 'Nike', 'Zara', 'H&M', 'Prada', 'Hermes', 'Dior'])
const colors = ref(['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Grey'])
const sizes = ref(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'])

const toggleSection = (section) => {
  activeSections[section] = !activeSections[section]
}

const toggleSeeMore = (section) => {
  expandedSections[section] = !expandedSections[section]
}

const visibleBrands = computed(() => {
  return expandedSections.brand ? brands.value : brands.value.slice(0, 8)
})

const visibleColors = computed(() => {
  return expandedSections.color ? colors.value : colors.value.slice(0, 8)
})

const visibleSizes = computed(() => {
  return expandedSections.size ? sizes.value : sizes.value.slice(0, 8)
})

// Ensure min doesn't exceed max and vice versa, and prevent negative values
watch(() => filters.minPrice, (newVal) => {
  if (newVal < 0) {
    filters.minPrice = 0
  }
  if (newVal > filters.maxPrice - 5) {
    filters.minPrice = filters.maxPrice - 5
  }
})

watch(() => filters.maxPrice, (newVal) => {
  if (newVal < 0) {
    filters.maxPrice = 0
  }
  if (newVal < filters.minPrice + 5) {
    filters.maxPrice = filters.minPrice + 5
  }
})

const trackStyle = computed(() => {
  const minPercent = ((filters.minPrice - minLimit) / (maxLimit - minLimit)) * 100
  const maxPercent = ((filters.maxPrice - minLimit) / (maxLimit - minLimit)) * 100
  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
    backgroundColor: 'var(--brand)' // Use brand color for track
  }
})
</script>

<style scoped>
.category-sidebar {
  background: #fff;
}

.filter-section {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 10px;
}

.filter-header h6 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--black);
}

.filter-header i {
  font-size: 14px;
  color: #666;
}

.transition-icon {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.filter-content-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out, opacity 0.3s ease;
  opacity: 0;
}

.filter-content-wrapper.is-open {
  max-height: 800px; /* Increased to accommodate expanded lists */
  opacity: 1;
}

.filter-content {
  padding-top: 10px;
}

.see-more-btn {
  background: transparent;
  border: none;
  color: var(--brand);
  font-size: 14px;
  font-weight: 600;
  padding: 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px; /* Default gap to prevent hover jump */
  transition: all 0.3s ease;
}

.see-more-btn:hover {
  opacity: 0.8;
  gap: 8px; /* Smooth transition instead of jump */
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Radio & Checkbox Styles */
.radio-container, .checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left:25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  color: #333;
}

.radio-container input, .checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.radio-container .checkmark {
  border-radius: 50%;
}

.checkbox-container .checkmark {
  border-radius: 4px;
}

.radio-container:hover input ~ .checkmark,
.checkbox-container:hover input ~ .checkmark {
  border-color: var(--brand);
}

.radio-container input:checked ~ .checkmark,
.checkbox-container input:checked ~ .checkmark {
  background-color: #fff;
  border-color: var(--brand);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radio-container input:checked ~ .checkmark:after,
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.radio-container .checkmark:after {
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--brand);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Price Input Styles */
.price-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.price-input:focus {
  border-color: var(--brand);
}

/* Range Slider Styles */
.price-slider-container {
  padding: 10px 0;
}

.range-slider {
  position: relative;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
}

.range-track {
  position: absolute;
  height: 100%;
  background: #ff4d4d; /* Red line like in image */
  border-radius: 2px;
}

.range-input {
  position: absolute;
  top: -8px;
  width: 100%;
  background: none;
  pointer-events: none;
  appearance: none;
}

.range-input::-webkit-slider-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #ddd;
  pointer-events: auto;
  appearance: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
}

.range-input::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #ddd;
  pointer-events: auto;
  appearance: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
}
</style>
