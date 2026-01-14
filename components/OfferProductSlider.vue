<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id" class="h-auto">
      <div class="position-relative bg-white rounded-3 zoom shadow-1 h-100 d-flex flex-column">
        <nuxt-link to="/product-details" class="h-100 d-block text-decoration-none">
          <div class="overflow-hidden">
            <img :src="item.image" alt="img" class="w-100 rounded-2">
          </div>
          <p class="p-lg bg-white p-1 p-md-3 pb-0 text-black flex-grow-1">{{ item.name }}</p>
          <ul class="d-flex align-items-center gap-1 rating justify-content-center pb-4 mt-auto">
            <li v-for="r in 5" :key="r"><i class="fa-solid fa-star"></i></li>
            <li class="text-brand fw-bold">({{ item.reviews }})</li>
          </ul>
          <div class="bg-white position-absolute top-0 text-uppercase start-0 border-1 py-1 px-2 rounded-2">
            <span class="text-brand discount-text fw-bold">{{ item.discount }}</span>
          </div>
        </nuxt-link>
        
        <!-- Wishlist Icon -->
        <div class="heart-box position-absolute top-0 end-0 m-2" :class="{ active: isInWishlist(item.id) }" @click.stop="toggleWishlist(item)">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
    </SwiperSlide>

  </BaseSlider>
</template>

<script setup>
import { SwiperSlide } from 'swiper/vue';

const { toggleWishlist, isInWishlist } = useWishlist();

defineProps({
  items: {
    type: Array,
    required: true
  },
  config: {
    type: Object,
    default: () => ({})
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
/* No extra styles needed as we use global heart-box styles */
</style>
