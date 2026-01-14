<template>
  <section class="hero-section position-relative">
    <div class="hero-area">
      <div v-if="!isMounted" class="skeleton-container">
        <Skeleton height="500px" border-radius="0" />
      </div>
      <Swiper
        v-else
        :modules="[Autoplay, EffectFade, Navigation]"
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
        :navigation="{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }"
        class="hero-banner-slider"
      >
        <SwiperSlide v-for="n in 3" :key="n">
          <nuxt-link to="/category" class="d-block">
            <img :src="`/assets/images/banners/hero-banner-${n}.jpg`" alt="img" class="w-100">
          </nuxt-link>
        </SwiperSlide>

        <!-- Navigation Arrows -->
        <button class="hero-nav-btn hero-prev">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <button class="hero-nav-btn hero-next">
          <i class="fa-solid fa-angle-right"></i>
        </button>
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
          <input type="text" placeholder="Search products..." class="w-100">
          <button>Search</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';

const selectRef = ref(null);
const isMounted = ref(false);

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
  isMounted.value = true;
  autoResizeSelect();
});
</script>


<style scoped>
.skeleton-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.hero-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  border: none;
  border-radius: 50%;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-nav-btn:hover {
  background: var(--brand);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.hero-prev {
  left:5%;
}

.hero-next {
  right: 5%;
}

/* Hide navigation on smaller screens if desired, or adjust size */
@media (max-width: 767px) {
  .hero-nav-btn {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
  .hero-prev { display: none; }
  .hero-next { display: none; }
}

@media all and (max-width: 1199px) {
  .skeleton-container {
    height: 400px;
  }
}

@media all and (max-width: 991px) {
  .skeleton-container {
    height: 300px;
  }
}

@media all and (max-width: 767px) {
  .skeleton-container {
    height: 200px;
  }
}
</style>

