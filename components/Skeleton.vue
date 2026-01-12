<template>
  <div :class="['skeleton', customClass]" :style="style"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '20px'
  },
  borderRadius: {
    type: String,
    default: '4px'
  },
  customClass: {
    type: String,
    default: ''
  }
});

const style = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius
}));
</script>

<style scoped>
.skeleton {
  background: #f0e9e9; /* Light brand-tinted base */
  background: linear-gradient(
    110deg, 
    #f0e9e9 8%, 
    #f5f0f0 18%, 
    #f0e9e9 33%
  );
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(69, 40, 41, 0.12), /* Increased opacity for more brand visibility */
    transparent
  );
  animation: shine 1.6s infinite ease-in-out;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>


