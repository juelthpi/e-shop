<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id" class="h-auto">
      <div class="product-item-wrap position-relative h-100">
        <NuxtLink to="/product-details" class="text-decoration-none">
          <div class="product-title-sm d-flex flex-column gap-2 product-show-design-1 zoom h-100" dir="ltr">
            <img :src="item.image" alt="img" class="w-100">
            <p class="product-title-sm flex-grow-1 text-black">{{ item.name }}</p>
          </div>
        </NuxtLink>
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
