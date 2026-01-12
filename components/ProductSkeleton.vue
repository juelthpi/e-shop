<template>
  <div :class="['product-skeleton', customClass]">
    <Skeleton height="200px" border-radius="10px" class="mb-2" />
    <Skeleton height="15px" width="80%" class="mb-1" />
    <Skeleton height="12px" width="40%" />
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.product-skeleton {
  padding: 10px;
  background: #fdfcfc; /* Subtle off-white brand tint */
  border-radius: 10px;
  border: 1px solid #f2eded;
}
</style>

