<template>
  <div class="swiper hot-banner-slider">
    <Swiper
      :modules="[Autoplay]"
      :loop="true"
      :centered-slides="true"
      :slides-per-view="1.5"
      :space-between="20"
      :speed="5000"
      :slide-to-clicked-slide="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: true
      }"
    >
      <SwiperSlide v-for="n in 5" :key="n">
        <div class="product-show-design-1 zoom">
          <img :src="`/assets/images/banners/${(n % 3) + 1}.jpg`" alt="img" class="w-100">
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
</script>

<style scoped>
/* CSS from style.css handled globally, but ensuring height style matches logic */
/* .hot-banner-slider .swiper-slide img { height: 400px; } ... */
</style>
