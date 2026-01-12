<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id">
      <div class="product-title-sm d-flex flex-column gap-2 product-show-design-1 zoom" dir="ltr">
        <img :src="item.image" alt="img" class="w-100">
        <p class="product-title-sm">{{ item.name }}</p>
      </div>
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
