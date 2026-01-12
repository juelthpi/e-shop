<template>
  <section class="hero-section position-relative">
    <div class="hero-area">
      <Swiper
        :modules="[Autoplay, EffectFade]"
        :loop="true"
        :slides-per-view="1"
        :speed="1000"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        class="hero-banner-slider"
      >
        <SwiperSlide v-for="n in 3" :key="n">
          <img :src="`/assets/images/banners/hero-banner-${n}.jpg`" alt="img" class="w-100">
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="d-flex justify-content-center">
      <!-- search -->
      <div class="header-search-wrapper position-absolute hero-search">
        <div class="search-box d-flex align-items-center gap-2">
          <div>
            <select class="auto-width-select" ref="selectRef" @change="autoResizeSelect">
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <input type="text" placeholder="Search products...">
          <button>Search</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';

const selectRef = ref(null);

const autoResizeSelect = () => {
  const select = selectRef.value;
  if (!select) return;
  
  const tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.style.font = window.getComputedStyle(select).font;
  tempSpan.innerText = select.options[select.selectedIndex].text;

  document.body.appendChild(tempSpan);
  select.style.width = tempSpan.offsetWidth + 25 + "px";
  document.body.removeChild(tempSpan);
}

onMounted(() => {
  autoResizeSelect();
});
</script>

<style scoped>
/* Scoped styles if any specific tweaks needed, otherwise handled by global CSS */
</style>
