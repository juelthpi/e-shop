<template>
  <div>
    <HeroSection />

    <!-- product slider -->
    <section class="mt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <SimpleProductSlider 
              :items="newProducts" 
              :config="newProductConfig" 
              custom-class="new-product-list-slider"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- product slider (Hot) -->
    <section class="mt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <SimpleProductSlider 
              :items="hotProducts" 
              :config="hotProductConfig" 
              custom-class="hot-product-list-slider"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Banner Slider + Icons -->
    <section class="mt-4">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-12">
            <BannerSlider />
          </div>
         
        </div>
        <div class="row gy-2 mt-3 gx-md-2 gx-1">
 <div class="col-3">
            <div class="feature-box-item rounded-3 py-3 px-1 px-md-2 text-center shadow-1 d-sm-flex align-items-center gap-2 bg-white justify-content-center">
              <img src="/assets/images/icons/cash-on-delivery.svg" class="max-width-42" alt="icon">
              <h6>Cash On Delivery</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="feature-box-item rounded-3 py-3 px-1 px-md-2 text-center shadow-1 d-sm-flex align-items-center gap-2 bg-white justify-content-center">
              <img src="/assets/images/icons/instant-return.svg" class="max-width-42" alt="icon">
              <h6>Instant Return</h6>
            </div>
          </div>
          <div class="col-3">
            <div class="feature-box-item rounded-3 py-3 px-1 px-md-2 text-center shadow-1 d-sm-flex align-items-center gap-2 bg-white justify-content-center">
              <img src="/assets/images/icons/delivery.svg" class="max-width-42" alt="icon">
              <h6>Delivery Within <span class="text-brand">48hrs</span></h6>
            </div>
          </div>
          <div class="col-3">
            <div class="feature-box-item rounded-3 py-3 px-1 px-md-2 text-center shadow-1 d-sm-flex align-items-center gap-2 bg-white justify-content-center">
              <img src="/assets/images/icons/best-price.svg" class="max-width-42" alt="icon">
              <h6>Best Price Deal</h6>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Banners -->
    <section class="mt-4">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-6">
            <div class="zoom overflow-hidden">
              <nuxt-link to="#"><img src="/assets/images/banners/banner-1.png" alt="img" class="w-100 rounded-3"></nuxt-link>
            </div>
          </div>
          <div class="col-md-6">
            <div class="zoom overflow-hidden">
              <nuxt-link to="#"><img src="/assets/images/banners/banner-2.png" alt="img" class="w-100 rounded-3"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Offer Product Slider -->
    <section class="mt-4">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-12">
            <OfferProductSlider 
              :items="topOfferProducts" 
              :config="offerProductConfig" 
              custom-class="top-offer-product-slider"
            />
          </div>
          <div class="col-md-12">
            <div class="zoom overflow-hidden">
              <nuxt-link to="#"><img src="/assets/images/banners/4.jpg" alt="img" class="w-100 rounded-3"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Tabs -->
    <CategoryTabs />

    <!-- Top Brands -->
    <section class="mt-4">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-12">
            <h4 class="after-bar d-inline-block mb-4">Top Brands</h4>
            <BrandSlider 
              :items="topBrands" 
              :config="brandSliderConfig" 
              custom-class="top-brands-product-slider"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>


const { generateProducts, generateBrands } = useProducts();

const newProducts = generateProducts(20);
const hotProducts = generateProducts(20);
const topOfferProducts = generateProducts(10);
const topBrands = generateBrands(10);

const newProductConfig = {
  slidesPerView: 1,
  spaceBetween:5,
  speed: 6000,
  autoplay: { delay: 1500, disableOnInteraction: true, pauseOnMouseEnter: true },
  breakpoints: {
    0: { slidesPerView: 4 },
    400: { slidesPerView: 4 },
    640: { slidesPerView: 5 },
    1024: { slidesPerView: 8 },
    1399: { slidesPerView: 9 }
  }
};

const hotProductConfig = {
  ...newProductConfig,
  rtl: true,
  autoplay: { delay: 2500, disableOnInteraction: true, pauseOnMouseEnter: true }
};

const offerProductConfig = {
  slidesPerView: 1,
  speed: 6000,
  spaceBetween:5,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  breakpoints: {
    0: { slidesPerView: 3 },
    400: { slidesPerView: 3 },
    600: { slidesPerView: 4 },
    840: { slidesPerView: 5 },
    1024: { slidesPerView: 6 }
  }
};

const brandSliderConfig = {
  ...offerProductConfig
};
</script>
