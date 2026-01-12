<template>
  <div class="product-tabs-section mt-5">
    <div class="container">
      <ul class="nav nav-tabs border-0 gap-4 mb-4" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link-custom active" 
            id="description-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#description" 
            type="button" 
            role="tab" 
            aria-controls="description" 
            aria-selected="true"
          >
            Description
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button 
            class="nav-link-custom" 
            id="reviews-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#reviews" 
            type="button" 
            role="tab" 
            aria-controls="reviews" 
            aria-selected="false"
          >
            Product Reviews 
            <span class="review-count">5</span>
          </button>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <!-- Description Tab -->
        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
          <div class="description-box">
            <p class="description-text">
              Turn heads like a true <strong>crown queen</strong> with this <strong>Soft Weightless Georgette Sharee.</strong>
            </p>
            <p class="description-text">
              Perfect for weddings, festivals, or just feeling like royalty at home.
            </p>
            <ul class="description-list">
              <li><strong>Length:</strong> 12 hands of pure elegance — long enough to steal the spotlight.</li>
              <li><strong>Width:</strong> 2.5 hands, giving you graceful drape and flow.</li>
              <li><strong>Blouse Piece:</strong> Not included</li>
              <li>Lightweight georgette makes it <strong>super comfy</strong> for all-day wear.</li>
              <li>Bursting with <strong>colorful crown vibes</strong> — playful, vibrant, and queenly.</li>
            </ul>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
           <h4 class="review-title mb-4">Product Reviews (5)</h4>
           
           <div class="review-list d-flex flex-column gap-3">
             <!-- Review Item 1 -->
             <div class="review-card">
               <div class="d-flex justify-content-between align-items-start mb-2">
                 <div>
                   <h6 class="reviewer-name">Dr Harun Or Rashid Harun</h6>
                   <span class="review-date">01-01-2026 7.44pm</span>
                 </div>
                 <div class="rating-stars">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                 </div>
               </div>
               <p class="review-text">it was really nice and beautiful,</p>
             </div>

             <!-- Review Item 2 -->
             <div class="review-card">
               <div class="d-flex justify-content-between align-items-start mb-2">
                 <div>
                   <h6 class="reviewer-name">Pankaj Kumar Das</h6>
                   <span class="review-date">18-11-2025 6.59pm</span>
                 </div>
                 <div class="rating-stars">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                 </div>
               </div>
               <p class="review-text">very good sharee. 100% recommend to all to buy, thanks seller and govaly for quick delivery</p>
             </div>

             <!-- Review Item 3 -->
             <div class="review-card">
               <div class="d-flex justify-content-between align-items-start mb-2">
                 <div>
                   <h6 class="reviewer-name">Saimon Rizvee Arnob</h6>
                   <span class="review-date">20-11-2025 8.06pm</span>
                 </div>
                 <div class="rating-stars">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                 </div>
               </div>
               <p class="review-text">Excellent product quality!</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link-custom {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #555;
  padding-bottom: 5px;
  position: relative;
  transition: all 0.3s;
}

.nav-link-custom.active {
  color: #000;
  font-weight: 600;
}

.nav-link-custom.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.review-count {
  background-color: #fce4ec;
  color: var(--brand);;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
  vertical-align: middle;
}

.description-box {
  border: 1px solid var(--brand);
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
}

.description-text {
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.6;
}

.description-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 0;
}

.description-list li {
  font-size: 15px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.5;
}

.review-title {
  color:var(--brand);
  font-weight: 600;
  font-size: 18px;
}

.review-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.reviewer-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
  color: #333;
}

.review-date {
  font-size: 12px;
  color: #888;
}

.rating-stars {
  color:#ffa41c;
  font-size: 14px;
}

.review-text {
  font-size: 14px;
  color: #444;
  margin-top: 8px;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .nav-link-custom {
    font-size: 14px;
  }
  
  .description-box {
    padding: 15px;
  }
}
</style>
