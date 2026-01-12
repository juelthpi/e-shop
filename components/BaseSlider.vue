<template>
  <div class="swiper-container-wrapper">
    <div v-if="!isMounted && showSkeleton" class="slider-skeleton-grid">
      <div v-for="n in skeletonCount" :key="n" class="skeleton-item">
        <slot name="skeleton">
          <ProductSkeleton />
        </slot>
      </div>
    </div>
    <Swiper
      v-else
      v-bind="config"
      :modules="[Autoplay, Navigation]"
      :loop="config.loop !== undefined ? config.loop : true"
      :dir="config.rtl ? 'rtl' : 'ltr'"
      :class="customClass"
      @swiper="onSwiper"
    >
      <slot />
    </Swiper>
  </div>


</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { ref, onMounted } from 'vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  customClass: {
    type: String,
    default: ''
  },
  showSkeleton: {
    type: Boolean,
    default: true
  },
  skeletonCount: {
    type: Number,
    default: 8
  }
});

const isMounted = ref(false);

onMounted(() => {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    isMounted.value = true;
  }, 100);
});

const onSwiper = (swiper) => {
  // Swiper is ready
};
</script>

<style scoped>
.slider-skeleton-grid {
  display: flex;
  gap: 10px;
  overflow: hidden;
  padding: 10px 0;
}

.skeleton-item {
  flex: 0 0 calc(100% / 8 - 10px);
  min-width: 150px;
}

@media (max-width: 1200px) {
  .skeleton-item {
    flex: 0 0 calc(100% / 6 - 10px);
  }
}

@media (max-width: 992px) {
  .skeleton-item {
    flex: 0 0 calc(100% / 4 - 10px);
  }
}

@media (max-width: 576px) {
  .skeleton-item {
    flex: 0 0 calc(100% / 2 - 10px);
  }
}
</style>

