<template>
  <footer class="mt-4 bg-white py-5">
    <div class="container">
      <div class="row gy-5">
        <div class="col-lg-3 col-md-12">
          <div class="d-flex flex-column align-items-center align-items-lg-start">
            <div class="footer-logo">
              <nuxt-link to="#"><img src="/assets/images/footer-logo.png" alt="logo"></nuxt-link>
            </div>
            <p>Bangladesh's Favorite Online Fashion Mall</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="footer-widget">
            <h5 class="mb-4">Our Policies</h5>
            <ul class="footer-item-nav d-flex flex-column gap-2">
              <li><nuxt-link to="#">Return & Refund Policy</nuxt-link></li>
              <li><nuxt-link to="#">Exchange Policy</nuxt-link></li>
              <li><nuxt-link to="#">Shipping & Delivery Policy</nuxt-link></li>
              <li><nuxt-link to="#">Cancellation Policy</nuxt-link></li>
              <li><nuxt-link to="#">Privacy Policy</nuxt-link></li>
              <li><nuxt-link to="#">Terms & Conditions</nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="footer-widget">
            <h5 class="mb-4">Our Seller</h5>
            <ul class="footer-item-nav d-flex flex-column gap-2">
              <li><nuxt-link to="#">Become A Seller </nuxt-link></li>
              <li><nuxt-link to="#"> Seller Policy</nuxt-link></li>
              <li><nuxt-link to="#"> Product Policy</nuxt-link></li>
              <li><nuxt-link to="#"> Delivery Policy</nuxt-link></li>
              <li><nuxt-link to="#"> Return Policy </nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <h5 class="mb-4">Social Links</h5>
          <ul class="footer-social-menu d-flex flex-column gap-2">
            <li><a href="#" class="d-flex align-items-center gap-2">
                <i class="fa-brands fa-facebook"></i> Facebook
              </a></li>
            <li><a href="#" class="d-flex align-items-center gap-2">
                <i class="fa-brands fa-instagram"></i> Instagram
              </a></li>
            <li><a href="#" class="d-flex align-items-center gap-2">
                <i class="fa-brands fa-tiktok"></i> TikTok
              </a></li>
            <li><a href="#" class="d-flex align-items-center gap-2">
                <i class="fa-brands fa-youtube"></i> YouTube
              </a></li>
            <li><a href="#" class="d-flex align-items-center gap-2">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp
              </a></li>
          </ul>
        </div>
        <div class="col-md-12">
          <img src="/assets/images/banners/payment.png" alt="img" class="w-100 rounded-3">
        </div>
      </div>
    </div>
    <!-- mobile view -->
    <div class="mobile-view d-block d-md-none">
  <div class="d-flex align-items-center justify-content-between gap-2 px-2">

    <NuxtLink
      
      class="mobile-menu-item d-flex flex-column align-items-center py-3"
      active-class="active"
    >
      <i class="fa-solid fa-house-chimney"></i>
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      
      class="mobile-menu-item d-flex align-items-center flex-column py-3"
      active-class="active"
    >
      <i class="fa-regular fa-heart"></i>
      <span>Wishlist</span>
    </NuxtLink>
    <div
      class="mobile-menu-item d-flex align-items-center flex-column py-3 cursor-pointer"
      @click="showSearch = !showSearch"
      :class="{ active: showSearch }"
    >
      <i class=" fas fa-search"></i>
      <span>Search</span>
    </div>

    <NuxtLink
      
      class="mobile-menu-item d-flex align-items-center flex-column py-3"
      
    >
      <i class="fa-solid fa-cart-plus"></i>
      <span>Cart</span>
    </NuxtLink>

    <NuxtLink
       
      class="mobile-menu-item d-flex align-items-center flex-column py-3"
       
    >
      <i class="fa-regular fa-user"></i>
      <span>Profile</span>
    </NuxtLink>

  </div>
</div>

  </footer>

  <!-- Small Search Popup -->
  <Transition name="slide-up">
    <div v-if="showSearch" class="search-popup shadow-lg p-3 rounded-top-3">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search products..." autofocus>
        <button class="btn btn-brand text-white" type="button"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const showSearch = ref(false);
</script>

<style scoped>
.search-popup {
  position: fixed;
  /* Above the mobile footer */
  bottom: 70px;
  left: 5%;
  width: 90%;
  background: white;
  z-index: 1050;
  border-top: 1px solid #eee;
}

.btn-brand {
  background-color: var(--brand);
}

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.search-popup .form-control:focus {
  box-shadow: none;
  border-color: #dee2e6;
}

@media (min-width: 768px) {
  .search-popup {
    display: none !important;
  }
}
</style>
