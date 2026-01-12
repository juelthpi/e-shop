<template>
  <div class="page-container">
    <div class="product-wrapper">
      <!-- Gallery Column -->
      <ProductGallery :images="currentImages" />

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
          
          <button class="btn-buy add-to-cart">Add to Cart</button>
          <button class="btn-buy buy-now">Buy Now</button>

          <!-- Seller Info Box -->
          <div class="seller-box mt-3">
            <div class="d-flex align-items-center gap-3">
              <div class="seller-logo">
                <img src="https://placehold.co/50x50" alt="Seller Logo">
              </div>
              <div class="seller-details">
                <h6 class="seller-name mb-1">Tech World US</h6>
                <div class="seller-rating">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star-half-stroke"></i>
                  <span class="ms-1 text-muted">(4.8)</span>
                </div>
              </div>
            </div>
            <div class="mt-2 text-center">
              <NuxtLink to="#" class="btn-visit-store">Visit Store</NuxtLink>
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
        <NuxtLink to="/" class="text-decoration-none text-brand fw-bold">See All</NuxtLink>
      </div>
      <SimpleProductSlider 
        :items="similarProducts" 
        :config="similarProductConfig" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const productData = {
  name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer',
  price: '398.00',
  ratingCount: '12,453',
  features: [
    'Industry-leading Noise Cancellation optimized to you',
    'Magnificent Sound, engineered to perfection with the new Integrated Processor V1',
    'Crystal clear hands-free calling with 4 beamforming microphones',
    'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
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
  offerEndTime: new Date(new Date().getTime() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
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
      ]
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
      ]
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
      ]
    }
  ]
};

const selectedColorId = ref('black');
const selectedSize = ref('Medium');
const quantity = ref(1);

const currentImages = computed(() => {
  const color = productData.colors.find(c => c.id === selectedColorId.value);
  return color ? color.images : [];
});

const handleColorChange = (newColorId) => {
  selectedColorId.value = newColorId;
};

const handleSizeChange = (newSize) => {
  selectedSize.value = newSize;
};

const totalPrice = computed(() => {
  const qty = Math.max(1, quantity.value);
  const basePrice = parseFloat(productData.price.replace(/,/g, ''));
  const discount = productData.discountPercentage || 0;
  const discountedPrice = basePrice * (1 - discount / 100);
  return (discountedPrice * qty).toFixed(2);
});

// Similar Products Logic
const { generateProducts } = useProducts();
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
@media (max-width: 991px) {
  .page-container {
    padding: 20px;
  }
  
  .product-wrapper {
    flex-wrap: wrap;
    gap: 20px;
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
}

@media (max-width: 767px) {
  .page-container {
    padding: 10px;
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

.hover-underline:hover {
  text-decoration: underline !important;
}

.shipping-grid {
  display: grid;
  gap: 4px;
  grid-template-columns: 80px 1fr;
  font-size: 13px;
}

/* Seller Box */
.seller-box {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.seller-logo img {
  border-radius: 50%;
  border: 1px solid #eee;
}

.seller-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.seller-rating {
  font-size: 12px;
  color: #ffa41c;
}

.btn-visit-store {
  display: inline-block;
  border: 1px solid #ddd;
  background: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-visit-store:hover {
  background: #f7f7f7;
  border-color: #999;
}
</style>
