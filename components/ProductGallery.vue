<template>
  <div class="product-gallery">
    <!-- Thumbnail List -->
    <div class="thumbnail-container">
      <div
        v-for="(img, index) in images"
        :key="index"
        :class="['thumbnail-item', { active: currentImageIndex === index }]"
        @mouseenter="currentImageIndex = index"
      >
        <img :src="img" :alt="'Thumbnail ' + index" />
      </div>
    </div>

    <!-- Main Image Display -->
    <div class="main-image-container" ref="mainImageRef" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <img :src="images[currentImageIndex]" alt="Main Product" class="main-image" />
      
      <!-- Zoom Lens -->
      <div v-show="isZooming" class="zoom-lens" :style="lensStyle"></div>

      <!-- Zoom Panel -->
      <div v-show="isZooming" class="zoom-panel">
        <div class="zoom-image-container" :style="zoomImageStyle">
          <img :src="images[currentImageIndex]" alt="Zoom View" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  }
});

const currentImageIndex = ref(0);
const isZooming = ref(false);
const mainImageRef = ref(null);
const lensSize = 150; // Size of the zoom lens box

const lensState = reactive({
  top: 0,
  left: 0,
});

const handleMouseMove = (event) => {
  if (!mainImageRef.value) return;
  isZooming.value = true;

  const rect = mainImageRef.value.getBoundingClientRect();
  let x = event.clientX - rect.left - lensSize / 2;
  let y = event.clientY - rect.top - lensSize / 2;

  // Constrain lens within image bounds
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > rect.width - lensSize) x = rect.width - lensSize;
  if (y > rect.height - lensSize) y = rect.height - lensSize;

  lensState.left = x;
  lensState.top = y;
};

const handleMouseLeave = () => {
  isZooming.value = false;
};

const lensStyle = computed(() => ({
  top: `${lensState.top}px`,
  left: `${lensState.left}px`,
  width: `${lensSize}px`,
  height: `${lensSize}px`,
}));

const zoomImageStyle = computed(() => {
  if (!mainImageRef.value) return {};
  const rect = mainImageRef.value.getBoundingClientRect();
  
  // Calculate zoom factor (e.g., 2x zoom)
  const zoomFactorX = (currentImageIndex.value || 0) + 2.5; // Arbitrary but looking good
  const zoomFactorY = (currentImageIndex.value || 0) + 2.5;

  // The zoom panel is usually a fixed size, let's say 400x400
  // We want to show the part of the image under the lens scaled up
  const posX = (lensState.left / rect.width) * 100;
  const posY = (lensState.top / rect.height) * 100;

  return {
    transform: `translate(-${posX}%, -${posY}%) scale(2.5)`,
    transformOrigin: '0 0'
  };
});
</script>

<style scoped>
.product-gallery {
  display: flex;
  gap: 20px;
  max-width: 600px;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail-item {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 2px;
  transition: border-color 0.2s;
}

.thumbnail-item.active {
  border-color: #e77600;
  box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.main-image-container {
  position: relative;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1/1;
  border: 1px solid #eee;
  cursor: crosshair;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.zoom-lens {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #aaa;
  pointer-events: none;
}

.zoom-panel {
  position: absolute;
  top: 0;
  left: 105%;
  width: 500px;
  height: 500px;
  border: 1px solid #ddd;
  background: white;
  z-index: 100;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.zoom-image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.zoom-image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
