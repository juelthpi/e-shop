<template>
  <div class="grid-item">
    <div class="tab-inner-item">
      <div class="border-1 rounded-3 position-relative overflow-hidden">
        <div class="swiper product-list-show-slider" @mouseenter="startAutoplay" @mouseleave="stopAutoplay">
          <div v-if="!isMounted" class="placeholder-img overflow-hidden zoom">
             <img :src="product.images[0]" alt="img" class="w-100 rounded-3">
          </div>
          <Swiper
            v-else
            :modules="[Autoplay]"
            :loop="true"
            :slides-per-view="1"
            :speed="500"
            :space-between="5"
            :autoplay="{ delay: 600, disableOnInteraction: false }"
            @swiper="onSwiper"
          >
            <SwiperSlide v-for="(img, index) in product.images" :key="index" class="overflow-hidden zoom">
              <NuxtLink to="/product-details">
                <img :src="img" alt="img" class="w-100 rounded-3" loading="lazy">
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="heart-box" :class="{ active: isWishlist }" @click="toggleWishlist">
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="slider-product-cart">
          <button @click="handleAddToCart" class="add-to-cart-btn border-0 w-100 text-decoration-none d-flex align-items-center justify-content-center">Add to cart</button>
        </div>
        <div class="p-3 rounded-2 bg-brand-2">
          <NuxtLink to="/product-details" class="text-decoration-none">
            <p class="text-black fw-semibold">{{ product.name }}</p>
          </NuxtLink>
          <p class="text-brand mt-1 fw-bold">৳{{ product.price }} <del class="text-gray">৳{{ product.oldPrice }}</del><span class="text-gold">({{ product.discount }})</span></p>
          <ul class="d-flex align-items-center gap-1 rating">
            <li v-for="n in 5" :key="n"><i class="fa-solid fa-star"></i></li>
            <li class="text-brand fw-bold">({{ product.reviews }})</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

// Define props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const swiperInstance = ref(null);
const { toggleWishlist: toggleGlobalWishlist, isInWishlist } = useWishlist();
const { openQuickView } = useQuickView();
const isMounted = ref(false);

const isWishlist = computed(() => isInWishlist(props.product.id));

const toggleWishlist = () => {
  toggleGlobalWishlist(props.product);
};

const handleAddToCart = () => {
  openQuickView(props.product);
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  swiper.autoplay.stop();
};

const startAutoplay = () => {
  swiperInstance.value?.autoplay.start();
};

const stopAutoplay = () => {
  swiperInstance.value?.autoplay.stop();
};

onMounted(() => {
  isMounted.value = true;
});
</script>


<style scoped>
/* No extra styles needed */
</style>
