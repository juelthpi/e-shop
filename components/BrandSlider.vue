<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id">
      <div class="position-relative">
        <nuxt-link to="/category">
          <div class="bg-white rounded-3 zoom overflow-hidden shadow-1 product-card">
            <img :src="item.image" alt="img" class="w-100 rounded-2">
            <div class="position-absolute top-50 start-50 translate-middle text-uppercase shadow-1 bg-white px-2 rounded-2 product-overlay">
              <p class="py-1 px-2 text-black mb-0">{{ item.name }}</p>
            </div>
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
