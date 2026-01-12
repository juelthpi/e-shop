<template>
  <section class="mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tabs-wrapper mb-4 border-1 rounded-3 shadow-1  py-2">
             <Swiper
                :modules="[Navigation]"
                :slides-per-view="'auto'"
                :space-between="10"
                :navigation="{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom'
                }"
                class="category-tabs-slider"
             >
                <SwiperSlide v-for="tab in tabs" :key="tab.id" class="width-auto">
                   <button 
                    class="nav-link text-nowrap" 
                    :class="{ active: currentTab === tab.id }" 
                    @click="currentTab = tab.id"
                    type="button" 
                  >
                    {{ tab.name }}
                  </button>
                </SwiperSlide>
             </Swiper>

            <div class="swiper-button-prev-custom scroll-btn ms-2">
               <i class="fa-solid fa-angle-left"></i>
            </div>
            <div class="swiper-button-next-custom scroll-btn me-2">
               <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" role="tabpanel">
              <div class="grid-container-1">
                <ProductCard 
                  v-for="product in displayedProducts" 
                  :key="`${currentTab}-${product.id}`" 
                  :product="product" 
                />
              </div>
                
              <!-- load more button -->
              <div class="d-flex justify-content-center" v-if="hasMore">
                <div class="d-inline-block mt-4">
                  <button class="primary-btn" @click="loadMore">Load More <i class="fa-solid fa-spinner"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const { generateProducts } = useProducts();

const tabs = [
  { id: 'you', name: 'For You' },
  { id: 'men', name: 'Men' },
  { id: 'women', name: 'Women' },
  { id: 'kids', name: 'Kids' },
  { id: 'baby', name: 'Baby' },
  { id: 'beauty', name: 'Health & Beauty' },
  { id: 'home', name: 'Home & Living' },
  { id: 'gadgets', name: 'Gadgets' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'footwear', name: 'Footwear' },
  { id: 'watches', name: 'Watches' },
  { id: 'sportswear', name: 'Sportswear' }
];

const currentTab = ref('you');
const allProducts = ref([]);
const displayLimit = ref(12);
const INITIAL_LIMIT = 10;
displayLimit.value = INITIAL_LIMIT;

const loadProductsForTab = () => {
    allProducts.value = generateProducts(42); 
    displayLimit.value = INITIAL_LIMIT;
};

// Initial load
loadProductsForTab();

watch(currentTab, () => {
    loadProductsForTab();
});

const displayedProducts = computed(() => {
    return allProducts.value.slice(0, displayLimit.value);
});

const hasMore = computed(() => {
    return displayLimit.value < allProducts.value.length;
});

const loadMore = () => {
    displayLimit.value += 10;
};
</script>

<style scoped>
.nav-link {
  transition: all 0.3s ease-in-out;
  border-radius: 20px;
  background: white;
  border: 1px solid #ddd;
  padding: 6px 16px;
  color: #333;
}

.nav-link.active {
  background: var(--brand, #000);
  color: white;
  border-color: var(--brand, #000);
}

.tabs-wrapper {
  position: relative;
  padding: 0 45px; /* Make space for buttons */
}

.category-tabs-slider {
  padding: 5px 0; /* Avoid clipping shadows */
}

.width-auto {
  width: auto !important;
}

/* Custom Navigation Buttons */
.scroll-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  color: #333;
}

.scroll-btn:hover {
  background: #f8f9fa;
  color: var(--brand, #000);
  border-color: var(--brand, #ddd);
}

.scroll-btn.swiper-button-disabled {
  opacity: 0.5;
  pointer-events: none;
  background: #f1f1f1;
}

.swiper-button-prev-custom {
  left: 0;
}

.swiper-button-next-custom {
  right: 0;
}
</style>
