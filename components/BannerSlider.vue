<template>
  <div class="swiper hot-banner-slider">
    <div v-if="!isMounted" class="banner-skeleton-grid">
      <Skeleton height="400px" border-radius="15px" width="70%" />
      <Skeleton height="400px" border-radius="15px" width="30%" />
    </div>
    <Swiper
      v-else
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
import { ref, onMounted } from 'vue';

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<style scoped>
.banner-skeleton-grid {
  display: flex;
  gap: 20px;
  height: 400px;
  overflow: hidden;
  justify-content: center;
}

@media all and (max-width: 1199px) {
  .banner-skeleton-grid {
    height: 300px;
  }
}

@media all and (max-width: 991px) {
  .banner-skeleton-grid {
    height: auto;
  }
}
</style>

