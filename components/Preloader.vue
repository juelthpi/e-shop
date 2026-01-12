<template>
  <Transition name="fade">
    <div v-if="isLoading" class="preloader-wrapper">
      <div class="preloader-content">
        <div class="logo-container">
          <img src="/assets/images/logo.png" alt="Logo" class="preloader-logo">
          <div class="glow-effect"></div>
        </div>
        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>
        <p class="loading-text">Welcome to Shop</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  if (document.readyState === 'complete') {
    finishLoading();
  } else {
    window.addEventListener('load', finishLoading);
    setTimeout(finishLoading, 1500); // Ensure minimal premium feel duration
  }
});

const finishLoading = () => {
    isLoading.value = false;
};
</script>

<style scoped>
.preloader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(205, 154, 16, 0.98);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.logo-container {
  position: relative;
  padding: 20px;
}

.preloader-logo {
  max-width: 150px;
  height: auto;
  position: relative;
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(var(--brand-rgb, 13, 110, 253), 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  animation: pulse-glow 2s infinite;
}

.progress-container {
  width: 200px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  width: 40%;
  height: 100%;
  background: var(--brand, #0d6efd);
  border-radius: 10px;
  position: absolute;
  left: 0;
  animation: progress-slide 2s infinite ease-in-out;
}

.loading-text {
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: fade-text 2s infinite;
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-glow {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
}

@keyframes progress-slide {
  0% { left: -100%; width: 50%; }
  50% { left: 25%; width: 50%; }
  100% { left: 100%; width: 50%; }
}

@keyframes fade-text {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
