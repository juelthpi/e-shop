<template>
  <div class="swiper-container-wrapper">
    <Swiper
      v-bind="config"
      :modules="[Autoplay, Navigation]"
      :loop="config.loop !== undefined ? config.loop : true"
      :dir="config.rtl ? 'rtl' : 'ltr'"
      :class="customClass"
    >
      <slot />
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';

defineProps({
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
/* Add swiper navigation styles if needed */
</style>
