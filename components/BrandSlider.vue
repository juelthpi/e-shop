<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id">
      <nuxt-link to="#">
        <div class="position-relative bg-white rounded-3 zoom overflow-hidden shadow-1 product-card">
          <img :src="item.image" alt="img" class="w-100 rounded-2">
          <div class="position-absolute top-50 start-50 translate-middle text-uppercase shadow-1 bg-white px-2 rounded-2 product-overlay">
            <p class="py-1 px-2 text-black mb-0">{{ item.name }}</p>
          </div>
        </div>
      </nuxt-link>
    </SwiperSlide>
  </BaseSlider>
</template>

<script setup>
import { SwiperSlide } from 'swiper/vue';

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
