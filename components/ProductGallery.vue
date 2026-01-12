<template>
  <div class="product-gallery">
    <!-- Thumbnail List -->
    <div class="thumbnail-container">
      <div
        v-for="(img, index) in images"
        :key="'img-' + index"
        :class="['thumbnail-item', { active: activeType === 'image' && activeIndex === index }]"
        @mouseenter="setActive('image', index)"
        @click="handleThumbClick(index)"
      >

        <img :src="img" :alt="'Thumbnail ' + index" />
      </div>
      <!-- Video Thumbnail -->
      <div 
        v-if="video"
        :class="['thumbnail-item video-thumb', { active: activeType === 'video' }]"
        @mouseenter="setActive('video')"
      >
        <div class="video-icon">
          <i class="fa-solid fa-play"></i>
        </div>
        <img :src="images[0]" alt="Video Thumbnail" class="opacity-50" />
      </div>
    </div>

    <!-- Main Content Display -->
    <div 
      class="main-image-container" 
      ref="mainImageRef" 
      @mousemove="handleMouseMove" 
      @mouseleave="handleMouseLeave"
      @click="handleMainClick"
    >
      <div v-show="activeType === 'video'" class="video-wrapper">
        <video :src="video" controls autoplay muted loop class="product-video"></video>
      </div>
      <div v-show="activeType === 'image'" class="image-display-wrapper">
        <img :src="images[activeIndex]" alt="Main Product" class="main-image" />
        
        <!-- Zoom Lens -->
        <div v-show="isZooming" class="zoom-lens" :style="lensStyle"></div>

        <!-- Zoom Panel -->
        <div v-show="isZooming" class="zoom-panel">
          <div class="zoom-image-container" :style="zoomImageStyle">
            <img :src="images[activeIndex]" alt="Zoom View" />
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
    <ProductImageModal 
      :is-open="isModalOpen" 
      :images="images" 
      :start-index="activeIndex" 
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  video: {
    type: String,
    default: null
  }
});

const activeType = ref('image'); // 'image' or 'video'
const activeIndex = ref(0);
const isZooming = ref(false);
const isModalOpen = ref(false);
const mainImageRef = ref(null);
const lensSize = 150; // Size of the zoom lens box
const zoomPanelSize = 500; // Size of the zoom panel

const lensState = reactive({
  top: 0,
  left: 0,
});

const setActive = (type, index = 0) => {
  activeType.value = type;
  activeIndex.value = index;
};

const handleMainClick = () => {
  if (activeType.value === 'image' && window.innerWidth <= 1299) {
    isModalOpen.value = true;
  }
};

const handleThumbClick = (index) => {
  if (window.innerWidth <= 1299) {
    activeIndex.value = index;
    activeType.value = 'image';
    isModalOpen.value = true;
  }
};



const handleMouseMove = (event) => {
  if (!mainImageRef.value || activeType.value !== 'image') {
    isZooming.value = false;
    return;
  }
  isZooming.value = true;

  const rect = mainImageRef.value.getBoundingClientRect();
  
  let x = event.clientX - rect.left - lensSize / 2;
  let y = event.clientY - rect.top - lensSize / 2;

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
  const scale = zoomPanelSize / lensSize;
  const posX = (lensState.left / rect.width) * 100;
  const posY = (lensState.top / rect.height) * 100;

  return {
    transform: `translate(-${posX}%, -${posY}%) scale(${scale})`,
    transformOrigin: '0 0',
    width: '100%',
    height: '100%'
  };
});
</script>

<style scoped>
.product-gallery {
  display: flex;
  gap:10px;
  max-width: 650px;
  width: 100%;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.thumbnail-item {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 2px;
  transition: all 0.2s;
  position: relative;
  background: white;
}

.thumbnail-item.active {
  border-color: #e77600;
  box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-thumb .video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: white;
  background: rgba(0,0,0,0.6);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.main-image-container {
  position: relative;
  flex: 1;
  max-width: 100%;
 
  border: 1px solid #eee;
  background: #fff;
  overflow: visible; /* Needed for zoom panel */
}

.image-display-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: crosshair;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-video {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Keeps aspect ratio within the black box */
}

.zoom-lens {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #aaa;
  pointer-events: none;
  z-index: 10;
}

.zoom-panel {
  position: absolute;
  top: 50%;
  left:100%;
  transform: translateY(-50%);
  max-width: 500px;
  width: 100%;
  height:100%;
  max-height: 500px;
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #ddd;
  background: white;
  z-index: 100;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
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

@media (max-width:1299px) {
  .zoom-lens{
    display: none;
  }
.zoom-panel {
  position: absolute;
  top: 100%;
  left:0%;
   display: none;
  max-width: 300px;
  width: 100%;
  height:100%;
  max-height: 300px;
  min-width:200px;
  min-height:200px;
  
}
}
@media (max-width: 767px) {
  .product-gallery {
    flex-direction: column-reverse;
  }
  .thumbnail-container {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  .zoom-panel {
    display: none !important; /* Disable zoom on mobile */
  }
}
</style>


