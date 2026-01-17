<template>
  <div class="page-container">
    <div v-if="!isMounted">
       <ProductDetailsSkeleton />
    </div>
    <div v-else>
      <div class="container mb-4">
        <AppBreadcrumb :items="breadcrumbItems" />
      </div>
      <div class="product-wrapper">
        <!-- Gallery Column -->
        <ProductGallery :images="currentImages" :video="currentVideo" />


        <!-- Info Column -->
        <ProductInfo 
          :product="productData" 
          :selectedColorId="selectedColorId"
          :selectedSize="selectedSize"
          v-model:quantity="quantity"
          @color-selected="handleColorChange"
          @size-selected="handleSizeChange"
        />

        <!-- Buy Column (Simulation) -->
        <div class="buy-column">
          <div class="buy-box">
            <h2>${{ totalPrice }}</h2>
            
            <p class="delivery">FREE delivery <strong>Tomorrow</strong></p>
            <div class="stock">In Stock</div>
          
            <div class="shipping-info mb-3 mt-3">
              <div class="shipping-grid">
                <div class="text-gray">Ships from</div>
                <div class="text-black">E-commerce</div>
                
                <div class="text-gray">Sold by</div>
                <NuxtLink to="#" class="text-brand text-decoration-none hover-underline">PRETTYGARDEN</NuxtLink>
                
                <div class="text-gray">Returns</div>
                <NuxtLink to="#" class="text-brand text-decoration-none hover-underline">30-day refund/replacement</NuxtLink>
                
                <div class="text-gray">Packaging</div>
                <div class="text-black">Ships in product packaging</div>
              </div>
            </div>
            
            <button class="btn-buy add-to-cart" @click="handleAddToCart">Add to Cart</button>
            <button class="btn-buy buy-now" @click="handleBuyNow">Buy Now</button>

            <!-- Success Animation Popup -->
            <Transition name="pop">
              <div v-if="showSuccessPopup" class="success-toast">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-circle-check text-success fa-lg"></i>
                  <span>Successfully added to cart!</span>
                </div>
              </div>
            </Transition>

            <!-- Seller Info Box -->
            <div class="seller-box mt-3">
              <div class="seller-header">
                <div class="seller-left">
                  <div class="seller-logo">
                    <img :src="sellerInfo.logo" alt="Seller Logo">
                  </div>
                  <div class="seller-details">
                    <h6 class="seller-name mb-1">{{ sellerInfo.name }}</h6>
                    <div class="seller-rating">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star-half-stroke"></i>
                      <span class="ms-1 rating-text">{{ sellerInfo.rating }}</span>
                    </div>
                  </div>
                </div>
                <div class="seller-right">
                  <div v-if="sellerInfo.isVerified" class="verification-badge verified" title="Verified Seller">
                    <i class="fa-solid fa-shield-check"></i>
                    <span>Verified</span>
                  </div>
                  <div v-else class="verification-badge unverified" title="Unverified Seller">
                    <i class="fa-solid fa-shield-exclamation"></i>
                    <span>Unverified</span>
                  </div>
                </div>
              </div>
              <div class="seller-footer">
                <NuxtLink to="#" class="primary-btn py-2 justify-content-center">
                  <i class="fa-solid fa-store"></i>
                  Visit Store
                </NuxtLink>
              </div>
            </div>
        
        
          </div>
        </div>
      </div>
      
      <!-- Description and Reviews -->
      <ProductDescriptionReviews />

      <!-- Similar Products -->
      <div class="mt-5 container">
        <div class="section-title mb-4 d-flex align-items-center justify-content-between">
          <h4 class="m-0 fw-bold">Similar Products</h4>
          
        </div>
        <SimpleProductSlider 
          :items="similarProducts" 
          :config="similarProductConfig" 
          @item-click="handleProductClick"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

const { addToCart } = useCart();
const showSuccessPopup = ref(false);
const isMounted = ref(false);

const handleAddToCart = () => {
  const color = productData.value.colors.find(c => c.id === selectedColorId.value);
  addToCart(productData.value, color, selectedSize.value, quantity.value);
  
  // Show success popup
  showSuccessPopup.value = true;
  setTimeout(() => {
    showSuccessPopup.value = false;
  }, 2000);
};

const handleBuyNow = () => {
  const color = productData.value.colors.find(c => c.id === selectedColorId.value);
  addToCart(productData.value, color, selectedSize.value, quantity.value);
  navigateTo('/checkout');
};

const handleProductClick = (item) => {
  // Sync selected item with product details view
  productData.value = {
    ...item,
    ratingCount: item.reviews || '0',
    features: [
      'High-quality premium built design',
      'Advanced technology integration',
      'Ergonomic and comfortable for long use',
      'Long-lasting durability and reliability',
      'Optimized performance for daily tasks'
    ],
    discountPercentage: parseInt(item.discount?.replace('%', '')) || 20,
    offerEndTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
  };
  
  // Reset selections
  selectedColorId.value = productData.value.colors?.[0]?.id || 'black';
  selectedSize.value = productData.value.sizes?.[0] || 'Medium';
  quantity.value = 1;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Category', link: '/category' },
    { name: 'Product Details', link: '' }
];

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 800);
});

const { generateProducts } = useProducts();

const sellerInfo = ref({
  name: 'Tech World US',
  isVerified: true,
  rating: 4.8,
  logo: 'https://placehold.co/50x50'
});

const productData = ref({
  id: 'sony-wh-1000xm5',
  name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer',
  price: '398.00',
  ratingCount: '12,453',
  features: [
    'Industry-leading Noise Cancellation optimized to you',
    'Magnificent Sound, engineered to perfection with the new Integrated Processor V1',
    'Crystal clear hands-free calling with 4 beamforming microphones',
    'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
    'Ultra-comfortable, lightweight design with soft fit leather'
  ],
  sizes: [
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large'
  ],
  discountPercentage: 25,
  offerEndTime: new Date(new Date().getTime() + 12 * 60 * 60 * 1000).toISOString(),
  colors: [
    {
      id: 'black',
      name: 'Black',
      swatchImg: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=150&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1500&auto=format&fit=crop'
      ],
      video: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 'silver',
      name: 'Silver',
      swatchImg: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=150&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1491927570842-0261e477d937?q=80&w=1500&auto=format&fit=crop'
      ],
      video: 'https://www.w3schools.com/html/movie.mp4'
    },
    {
      id: 'midnight-blue',
      name: 'Midnight Blue',
      swatchImg: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=150&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=1500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599666505317-7bb0a99c5898?q=80&w=1500&auto=format&fit=crop'
      ],
      video: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
  ]
});

const selectedColorId = ref('black');
const selectedSize = ref('Medium');
const quantity = ref(1);

const currentImages = computed(() => {
  const color = productData.value.colors.find(c => c.id === selectedColorId.value);
  return color ? color.images : [];
});

const currentVideo = computed(() => {
  const color = productData.value.colors.find(c => c.id === selectedColorId.value);
  return color ? color.video : null;
});

const handleColorChange = (newColorId) => {
  selectedColorId.value = newColorId;
};

const handleSizeChange = (newSize) => {
  selectedSize.value = newSize;
};

const totalPrice = computed(() => {
  const qty = Math.max(1, quantity.value);
  const basePrice = parseFloat(productData.value.price.replace(/,/g, ''));
  const discount = productData.value.discountPercentage || 0;
  const discountedPrice = basePrice * (1 - discount / 100);
  return (discountedPrice * qty).toFixed(2);
});

// Similar Products Logic
const similarProducts = generateProducts(10); // Mock 10 products

const similarProductConfig = {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: { delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true },
  breakpoints: {
    0: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
    1200: { slidesPerView: 6 }
  }
};
</script>

<style scoped>
.page-container {
  padding: 40px;
  font-family: 'Inter', sans-serif;
  background-color: #fff;
  min-height: 100vh;
}

.product-wrapper {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 30px;
}

.buy-column {
  flex: 0 0 250px;
}

.buy-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

 

.delivery {
  font-size: 14px;
  margin-bottom: 15px;
}

.stock {
  color: #007600;
  font-size: 18px;
  margin-bottom: 20px;
}

.btn-buy {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: opacity 0.2s;
}

.btn-buy:hover {
  opacity: 0.9;
}

.add-to-cart {
  background-color: #ffd814;
  color: #0f1111;
}

.buy-now {
  background-color: #ffa41c;
  color: #0f1111;
}


/* Tablet & Mobile Capabilities */
@media (max-width: 1299px) {
  .product-wrapper {
    flex-wrap: wrap;
    gap: 20px;
  }
   .product-wrapper {
    flex-direction: column;
  }

  /* Make gallery and info full width */
  .product-wrapper > * {
    flex: 0 0 100%;
  }

  .buy-box {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-buy {
    width: 100%;
    margin-bottom: 10px;
  }
  
}
@media (max-width: 991px) {
  .page-container {
    padding: 20px;
  }
  

  
  .buy-column {
    flex: 0 0 100%;
    order: 3; /* Move buy box to bottom on tablet/mobile */
  }
  
  .buy-box {
    position: static; /* Remove sticky on mobile */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap:4px;
  }
  
  .buy-box > * {
    margin-bottom: 0;
  }
  
  .btn-buy {
    width: auto;
    flex: 1;
    margin-bottom: 0;
  }
    .page-container {
    padding: 10px;
  }
    .buy-box {
    flex-direction: column;
    align-items: stretch;
  }


}

 

.hover-underline:hover {
  text-decoration: underline !important;
}

.shipping-grid {
  display: grid;
  gap: 4px;
  grid-template-columns: 80px 1fr;
  font-size: 13px;
}

/* Seller Box - Premium Design */
.seller-box {
  border: 1px solid #e5e7eb;
  background: linear-gradient(to bottom, #ffffff, #fafafa);
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.seller-box:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.seller-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  flex-direction: column;
  background: white;
  border-bottom: 1px solid #f3f4f6;
}

.seller-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.seller-logo {
  flex-shrink: 0;
}

.seller-logo img {
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  width: 50px;
  height: 50px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.seller-box:hover .seller-logo img {
  border-color: var(--brand);
  transform: scale(1.05);
}

.seller-details {
  flex: 1;
  min-width: 0;
}

.seller-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.2px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.seller-rating {
  font-size: 13px;
  color: #fbbf24;
  display: flex;
  align-items: center;
  gap: 2px;
}

.seller-rating .rating-text {
  color: #6b7280;
  font-weight: 600;
  font-size: 12px;
}

.seller-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.seller-footer {
  padding: 12px 16px;
  background: #f9fafb;
  text-align: center;
}

 
 


/* Verification Badge Styles */
.verification-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 24px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.verification-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s;
}

.verification-badge:hover::before {
  left: 100%;
}

.verification-badge.verified {
  background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
  color: white;
  border: 2px solid #059669;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2);
}

.verification-badge.verified:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.3);
}

.verification-badge.verified i {
  font-size: 15px;
  animation: verifiedPulse 2s infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

@keyframes verifiedPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

.verification-badge.unverified {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
  color: white;
  border: 2px solid #d97706;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4), 0 0 20px rgba(245, 158, 11, 0.2);
}

.verification-badge.unverified:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.5), 0 0 30px rgba(245, 158, 11, 0.3);
}

.verification-badge.unverified i {
  font-size: 15px;
  animation: unverifiedShake 3s infinite;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

@keyframes unverifiedShake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

/* Enhanced Seller Name */
.seller-name {
  font-size: 15px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.2px;
}

/* Success Toast Styles */
.success-toast {
  position: fixed;
  top: 100px;
  right: 20px;
  background: white;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-left: 5px solid #28a745;
  z-index: 9999;
}

.pop-enter-active, .pop-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from {
  transform: translateX(100px) scale(0.8);
  opacity: 0;
}
.pop-leave-to {
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
}
</style>
