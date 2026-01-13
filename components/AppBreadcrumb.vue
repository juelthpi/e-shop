<template>
  <div class="breadcrumb">
    <ul class="d-flex align-items-center gap-2 flex-wrap">
      <li v-for="(item, index) in items" :key="index" class="d-flex align-items-center gap-2">
        <NuxtLink v-if="item.link" :to="item.link">{{ item.name }}</NuxtLink>
        <span v-else>{{ item.name }}</span>
        <i v-if="index < items.length - 1" class="fa-solid fa-angle-right"></i>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // Expected format: [{ name: 'Home', link: '/' }, { name: 'Category' }]
  }
})
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 10px;
}

.breadcrumb ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.breadcrumb ul li {
  font-size: 14px;
}

.breadcrumb ul li a {
  color: var(--black);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.breadcrumb ul li a:hover {
  color: var(--brand);
}

.breadcrumb ul li i {
  font-size: 10px;
  color: #999;
}

.breadcrumb ul li:last-child span,
.breadcrumb ul li:last-child a {
  opacity: 0.8;
  color: var(--brand);
  pointer-events: none;
}
</style>
