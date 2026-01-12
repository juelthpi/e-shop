<template>
  <Teleport to="body">
    <div v-if="isOpen" class="image-modal-overlay" @click.self="close">
      <div class="modal-content-wrapper">
        <!-- Header -->
        <div class="modal-header">
          <div class="header-left">
            <span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
            <span class="navigation-hint d-none d-md-inline">Use arrow keys to navigate</span>
          </div>
          <div class="header-right">
            <button class="icon-btn" @click="zoomIn"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
            <button class="icon-btn" @click="rotate"><i class="fa-solid fa-rotate-right"></i></button>
            <button class="icon-btn" @click="toggleFullscreen"><i class="fa-solid fa-expand"></i></button>
            <div class="divider"></div>
            <button class="icon-btn close-btn" @click="close"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        <!-- Main View -->
        <div class="main-viewer">
          <button class="nav-arrow left" @click="prev">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          
          <div class="image-display" :style="imageContainerStyle">
            <img 
              :src="images[currentIndex]" 
              alt="Full view" 
              :style="imageStyle"
              class="modal-main-image"
            />
          </div>

          <button class="nav-arrow right" @click="next">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>

        <!-- Thumbnails -->
        <div class="modal-footer">
          <div class="footer-thumbnails">
            <div 
              v-for="(img, index) in images" 
              :key="index"
              class="footer-thumb"
              :class="{ active: currentIndex === index }"
              @click="currentIndex = index"
            >
              <img :src="img" alt="Thumbnail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  images: Array,
  startIndex: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['close']);

const currentIndex = ref(props.startIndex);
const transform = ref({ scale: 1, rotate: 0 });

watch(() => props.startIndex, (val) => {
  currentIndex.value = val;
});

watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
    transform.value = { scale: 1, rotate: 0 };
  } else {
    document.body.style.overflow = '';
  }
});

const close = () => emit('close');

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  resetTransform();
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  resetTransform();
};

const resetTransform = () => {
  transform.value = { scale: 1, rotate: 0 };
};

const zoomIn = () => {
  transform.value.scale = transform.value.scale === 1 ? 2 : 1;
};

const rotate = () => {
  transform.value.rotate += 90;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const imageContainerStyle = computed(() => ({
  overflow: transform.value.scale > 1 ? 'auto' : 'hidden'
}));

const imageStyle = computed(() => ({
  transform: `scale(${transform.value.scale}) rotate(${transform.value.rotate}deg)`,
  transition: 'transform 0.3s ease'
}));

const handleKeydown = (e) => {
  if (!props.isOpen) return;
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'Escape') close();
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<style scoped>
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 245, 245, 0.98);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.image-counter {
  font-weight: 700;
  color: var(--brand);
  font-size: 16px;
}

.navigation-hint {
  color: #888;
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #555;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: var(--brand);
}

.divider {
  width: 1px;
  height: 24px;
  background: #ddd;
  margin: 0 5px;
}

.main-viewer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  position: relative;
}

.image-display {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-main-image {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.nav-arrow {
  width: 45px;
  height: 45px;
  background: white;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  transition: all 0.2s;
  z-index: 10;
}

.nav-arrow:hover {
  background: var(--brand);
  color: white;
}

.modal-footer {
  height: 140px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.footer-thumbnails {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.footer-thumb {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.footer-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer-thumb.active {
  border-color: var(--brand);
  box-shadow: 0 0 10px rgba(69, 40, 41, 0.3);
}

@media (max-width: 768px) {
  .modal-header { padding: 0 15px; }
  .main-viewer { padding: 10px; }
  .nav-arrow { width: 35px; height: 35px; }
}
</style>
