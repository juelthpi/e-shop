<template>
  <div class="product-details-skeleton">
    <div class="product-wrapper">
      <!-- Gallery Skeleton -->
      <div class="gallery-skeleton">
        <div class="thumbnails">
          <Skeleton v-for="n in 4" :key="n" width="60px" height="60px" border-radius="4px" class="mb-2" />
        </div>
        <div class="main-image">
          <Skeleton width="100%" height="100%" border-radius="4px" />
        </div>
      </div>

      <!-- Info Skeleton -->
      <div class="info-skeleton">
        <Skeleton width="80%" height="30px" class="mb-3" />
        <Skeleton width="40%" height="20px" class="mb-4" />
        <hr />
        <Skeleton width="30%" height="40px" class="mb-3" />
        <Skeleton width="20%" height="20px" class="mb-4" />
        <div class="d-flex gap-2 mb-4">
          <Skeleton v-for="n in 3" :key="n" width="50px" height="50px" border-radius="50%" />
        </div>
        <Skeleton width="90%" height="15px" class="mb-2" />
        <Skeleton width="85%" height="15px" class="mb-2" />
        <Skeleton width="88%" height="15px" class="mb-2" />
      </div>

      <!-- Buy Skeleton -->
      <div class="buy-skeleton">
        <div class="skeleton-card">
          <Skeleton width="60%" height="30px" class="mb-3" />
          <Skeleton width="100%" height="20px" class="mb-3" />
          <Skeleton width="40%" height="25px" class="mb-4" />
          <Skeleton width="100%" height="45px" border-radius="25px" class="mb-2" />
          <Skeleton width="100%" height="45px" border-radius="25px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Uses the base Skeleton component
</script>

<style scoped>
.product-details-skeleton {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}

.product-wrapper {
  display: flex;
  gap: 30px;
}

.gallery-skeleton {
  display: flex;
  gap: 10px;
  flex: 0 0 650px;
  max-width: 650px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
}

.main-image {
  flex: 1;
  aspect-ratio: 1/1;
  width: 100%;
}

.info-skeleton {
  flex: 1;
}

.buy-skeleton {
  flex: 0 0 250px;
}

.skeleton-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

@media (max-width: 1299px) {
  .product-wrapper {
    flex-direction: column;
  }
  .gallery-skeleton, .buy-skeleton {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .product-details-skeleton {
    padding: 20px;
  }
}
</style>

