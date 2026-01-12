<template>
  <BaseSlider :config="config" :custom-class="customClass">
    <SwiperSlide v-for="item in items" :key="item.id" class="h-auto">
      <div class="product-title-sm d-flex flex-column gap-2 product-show-design-1 zoom h-100" dir="ltr">
        <img :src="item.image" alt="img" class="w-100">
        <p class="product-title-sm flex-grow-1">{{ item.name }}</p>
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
