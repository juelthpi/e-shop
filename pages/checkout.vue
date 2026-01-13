<template>
  <div class="checkout-page pb-5">
    <div class="container">
      <div class="py-4">
        <AppBreadcrumb :items="breadcrumbItems" />
      </div>

      <!-- Progress Stepper -->
      <div class="checkout-stepper mb-5 d-none d-md-flex">
        <div class="stepper-item active">
          <div class="step-num"><i class="fa-solid fa-check animate-check"></i></div>
          <div class="step-label">Shopping</div>
        </div>
        <div class="stepper-line active"></div>
        <div class="stepper-item active">
          <div class="step-num"><i class="fa-solid fa-check animate-check check-2"></i></div>
          <div class="step-label">Cart</div>
        </div>
        <div class="stepper-line active"></div>
        <div class="stepper-item active">
          <div class="step-num"><i class="fa-solid fa-check animate-check check-3"></i></div>
          <div class="step-label">Checkout</div>
        </div>
        <div class="stepper-line"></div>
        <div class="stepper-item">
          <div class="step-num">4</div>
          <div class="step-label">Payment</div>
        </div>
      </div>

      <div class="row gy-4">
        <!-- Left Column: Shipping & Products -->
        <div class="col-lg-8">
          <!-- Shipping Form Card -->
          <div class="checkout-card mb-4 p-4 p-md-5">
            <div class="row gy-4">
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Full Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control-custom" placeholder="Enter your full name">
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Phone Number <span class="text-danger">*</span></label>
                  <input type="text" class="form-control-custom" placeholder="01706720499">
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Address <span class="text-danger">*</span></label>
                  <input type="text" class="form-control-custom" placeholder="Building / House No / Floor / Street">
                </div>
                <div class="form-group mb-0">
                  <label class="form-label fw-bold mb-2">Additional Instruction</label>
                  <textarea class="form-control-custom py-3" placeholder="Enter additional instruction for the address (optional)" rows="3"></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-4 position-relative">
                  <label class="form-label fw-bold mb-2">Division</label>
                  <div class="searchable-select-wrapper" @click="toggleSelect('division')">
                     <div class="selected-val">{{ selectedDivision || '-- Please choose your division --' }}</div>
                     <i class="fa-solid fa-angle-down"></i>
                     <div v-if="activeSelect === 'division'" class="search-dropdown shadow-lg p-2" @click.stop>
                        <input type="text" v-model="divisionSearch" placeholder="Search division..." class="search-input mb-2">
                        <ul class="options-list">
                           <li v-for="d in filteredDivisions" :key="d" @click="selectOption('division', d)">{{ d }}</li>
                        </ul>
                     </div>
                  </div>
                </div>
                <div class="form-group mb-4 position-relative">
                  <label class="form-label fw-bold mb-2">City / District <span class="text-danger">*</span></label>
                  <div class="searchable-select-wrapper" @click="toggleSelect('district')">
                     <div class="selected-val">{{ selectedDistrict || '-- Please choose your district --' }}</div>
                     <i class="fa-solid fa-angle-down"></i>
                     <div v-if="activeSelect === 'district'" class="search-dropdown shadow-lg p-2" @click.stop>
                        <input type="text" v-model="districtSearch" placeholder="Search district..." class="search-input mb-2">
                        <ul class="options-list">
                           <li v-for="d in filteredDistricts" :key="d" @click="selectOption('district', d)">{{ d }}</li>
                        </ul>
                     </div>
                  </div>
                </div>
                <div class="form-group mb-4 position-relative">
                  <label class="form-label fw-bold mb-2">Police Station / Upazila</label>
                   <div class="searchable-select-wrapper" @click="toggleSelect('upazila')">
                     <div class="selected-val">{{ selectedUpazila || '-- Please choose your area --' }}</div>
                     <i class="fa-solid fa-angle-down"></i>
                     <div v-if="activeSelect === 'upazila'" class="search-dropdown shadow-lg p-2" @click.stop>
                        <input type="text" v-model="upazilaSearch" placeholder="Search area..." class="search-input mb-2">
                        <ul class="options-list">
                           <li v-for="u in filteredUpazilas" :key="u" @click="selectOption('upazila', u)">{{ u }}</li>
                        </ul>
                     </div>
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-3">Select a label for effective delivery:</label>
                  <div class="d-flex gap-3">
                    <button class="label-btn" :class="{ active: deliveryLabel === 'home' }" @click="deliveryLabel = 'home'">
                      <i class="fa-solid fa-house mb-0"></i> Home
                    </button>
                    <button class="label-btn" :class="{ active: deliveryLabel === 'office' }" @click="deliveryLabel = 'office'">
                      <i class="fa-solid fa-building mb-0"></i> Office
                    </button>
                  </div>
                </div>
                <label class="checkbox-container-custom mt-3">
                  <input type="checkbox" checked>
                  <span class="checkmark"></span>
                  <span class="label-text">Make it default address</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Product Table Card -->
          <div class="checkout-card p-0 overflow-hidden">
            <!-- Header -->
            <div class="p-3 border-bottom d-flex align-items-center gap-3 bg-white">
              <label class="checkbox-container-custom mb-0">
                <input type="checkbox" checked disabled>
                <span class="checkmark"></span>
                <span class="label-text fw-medium">Select All</span>
              </label>
            </div>
            
            <div class="product-list-container">
               <div v-if="cart.length > 0">
                  <div class="vendor-header p-3 d-flex align-items-center gap-3">
                      <label class="checkbox-container-custom mb-0">
                        <input type="checkbox" checked disabled>
                        <span class="checkmark"></span>
                      </label>
                      <i class="fa-solid fa-store text-brand"></i>
                      <span class="fw-bold">Your Items</span>
                  </div>

                  <div class="checkout-product-table">
                     <div class="table-head d-flex px-4 py-2 text-uppercase text-muted small fw-bold">
                        <div style="flex: 2">Product</div>
                        <div style="flex: 1" class="text-center">Price</div>
                        <div style="flex: 1" class="text-end pe-4">Actions</div>
                     </div>
                     
                     <div v-for="item in cart" :key="item.cartItemId" class="product-row d-flex align-items-center px-4 py-4 border-top">
                        <div style="flex: 2" class="d-flex align-items-center gap-3">
                           <label class="checkbox-container-custom mb-0">
                              <input type="checkbox" checked disabled>
                              <span class="checkmark"></span>
                           </label>
                           <div class="product-img-box rounded overflow-hidden">
                              <img :src="item.image" :alt="item.name">
                           </div>
                           <div class="flex-grow-1">
                              <p class="product-name-checkout mb-1 fw-medium">{{ item.name }}</p>
                              <div class="product-meta-badge">Size: {{ item.size || 'Medium' }}</div>
                           </div>
                        </div>
                        <div style="flex: 1" class="text-center fw-bold text-black fs-5">
                           ৳{{ (parseFloat(item.price.toString().replace(/[^\d.]/g, '')) * item.quantity).toFixed(2) }}
                        </div>
                        <div style="flex: 1" class="text-end pe-4">
                           <div class="qty-control-disabled d-inline-flex align-items-center gap-3 p-1 px-3 rounded-pill border bg-light opacity-75">
                              <span class="qty-btn-disabled">-</span>
                              <span class="qty-val fw-bold">{{ item.quantity }}</span>
                              <span class="qty-btn-disabled">+</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-else class="p-5 text-center bg-white">
                 <p class="text-muted">Your cart is empty. <NuxtLink to="/category" class="text-brand">Go shopping</NuxtLink></p>
               </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="col-lg-4">
          <div class="checkout-card p-4">
            <label class="form-label fw-bold mb-3">Coupon:</label>
            <div class="coupon-box mb-4">
              <input type="text" placeholder="Enter coupon code" class="coupon-input-field">
              <button class="apply-coupon-btn">Apply</button>
            </div>

            <h5 class="mb-4 fw-bold">Summary</h5>
            <div class="summary-list">
              <div class="summary-item d-flex justify-content-between mb-3 text-muted">
                <span>Product Price</span>
                <span class="text-dark fw-bold">৳{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-item d-flex justify-content-between mb-3 text-muted">
                <div class="d-flex flex-column">
                  <span>Standard Delivery</span>
                  <small class="text-brand">Keedlee</small>
                </div>
                <span class="text-dark fw-bold">৳0</span>
              </div>
              <div class="summary-item d-flex justify-content-between mb-3 text-muted">
                <span>Discount</span>
                <span class="text-dark fw-bold">৳0</span>
              </div>
              <div class="divider my-3"></div>
              <div class="summary-item d-flex justify-content-between mb-4">
                <h6 class="fw-bold mb-0 text-black">Total Payable</h6>
                <h6 class="fw-bold text-brand mb-0">৳{{ subtotal.toFixed(2) }}</h6>
              </div>
            </div>

            <button class="primary-btn  justify-content-center">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const { cart, subtotal } = useCart()

const breadcrumbItems = [
  { name: 'Home', link: '/' },
  { name: 'Checkout', link: '' }
]

const deliveryLabel = ref('home')
const activeSelect = ref(null)

// Locations Data
const divisions = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh']
const districts = ['Dhaka', 'Narayanganj', 'Gazipur', 'Manikganj', 'Munshiganj', 'Narsingdi']
const upazilas = ['Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar']

// Selection States
const selectedDivision = ref('')
const selectedDistrict = ref('')
const selectedUpazila = ref('')

// Search States
const divisionSearch = ref('')
const districtSearch = ref('')
const upazilaSearch = ref('')

// Filtering Logic
const filteredDivisions = computed(() => {
   if (!divisionSearch.value) return divisions
   return divisions.filter(d => d.toLowerCase().includes(divisionSearch.value.toLowerCase()))
})

const filteredDistricts = computed(() => {
   if (!districtSearch.value) return districts
   return districts.filter(d => d.toLowerCase().includes(districtSearch.value.toLowerCase()))
})

const filteredUpazilas = computed(() => {
   if (!upazilaSearch.value) return upazilas
   return upazilas.filter(u => u.toLowerCase().includes(upazilaSearch.value.toLowerCase()))
})

// Handlers
const toggleSelect = (type) => {
   if (activeSelect.value === type) {
      activeSelect.value = null
   } else {
      activeSelect.value = type
   }
}

const selectOption = (type, val) => {
   if (type === 'division') selectedDivision.value = val
   if (type === 'district') selectedDistrict.value = val
   if (type === 'upazila') selectedUpazila.value = val
   activeSelect.value = null
}

const closeAllSelects = (e) => {
   if (!e.target.closest('.searchable-select-wrapper')) {
      activeSelect.value = null
   }
}

onMounted(() => {
   window.addEventListener('click', closeAllSelects)
})

onUnmounted(() => {
   window.removeEventListener('click', closeAllSelects)
})
</script>

<style scoped>
.checkout-page {
  background: #f8f9fa;
}

/* Stepper */
.checkout-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.step-num {
    outline: 1px solid var(--brand);
    outline-offset:5px;
  width: 35px;
  height: 35px;
  background: #e9ecef;
  color: #adb5bd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.step-label {
  font-size: 13px;
  font-weight: 500;
  color: #adb5bd;
}

.stepper-item.active .step-num {
  background: var(--brand);
  color: white;
}

.stepper-item.active .step-label {
  color: #191919;
}

.stepper-line {
  flex-grow: 1;
  height:2px;
  background: #e9ecef;
  margin: -25px 10px 0;
  border-radius: 2px;
}

.stepper-line.active {
  background: var(--brand);
}

/* Stepper Animations */
.animate-check {
   animation: checkPop 3s infinite;
}

.check-2 { animation-delay: 0.4s; }
.check-3 { animation-delay: 0.8s; }

@keyframes checkPop {
   0%, 10% { opacity: 0; transform: scale(0.5); }
   20%, 80% { opacity: 1; transform: scale(1); }
   90%, 100% { opacity: 0; transform: scale(0.5); }
}

/* Cards */
.checkout-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.05);
}

/* Form Styling */
.form-control-custom {
  width: 100%;
  padding: 12px 20px;
  background: #fdfdfd;
  border: 1.5px solid #eee;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s;
}

.form-control-custom:focus {
  border-color: color-mix(in srgb, var(--brand) 20%, transparent);
  background: white;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--brand) 5%, transparent);
}

/* Searchable Select */
.searchable-select-wrapper {
   width: 100%;
   padding: 12px 20px;
   background: #fdfdfd;
   border: 1.5px solid #eee;
   border-radius: 10px;
   cursor: pointer;
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: relative;
   font-size: 14px;
}

.selected-val {
   color: #555;
}

.search-dropdown {
   position: absolute;
   top: 100%;
   left: 0;
   width: 100%;
   background: white;
   z-index: 100;
   margin-top: 5px;
   border-radius: 10px;
   border: 1px solid #eee;
   max-height: 250px;
   display: flex;
   flex-direction: column;
}

.search-input {
   width: 100%;
   padding: 8px 12px;
   border: 1px solid #eee;
   border-radius: 8px;
   outline: none;
   font-size: 13px;
}

.options-list {
   list-style: none;
   padding: 0;
   margin: 0;
   overflow-y: auto;
}

.options-list li {
   padding: 10px 15px;
   transition: all 0.2s;
}

.options-list li:hover {
   background: #f8f9fa;
   color: var(--brand);
}

.label-btn {
  padding: 6px 22px;
  border-radius:8px;
  border: 1.5px solid #eee;
  background: white;
  font-weight:500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  font-size: 14px;
}

.label-btn.active {
  background: var(--brand);
  color: white;
  border-color: var(--brand);
}

/* Custom Checkbox Design (Matching Screenshot) */
.checkbox-container-custom {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container-custom input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 22px;
  width: 22px;
  background-color: #eee;
  border-radius: 6px;
  transition: all 0.2s;
}

.checkbox-container-custom:hover input ~ .checkmark {
  background-color: #ddd;
}

.checkbox-container-custom input:checked ~ .checkmark {
  background-color: var(--brand);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container-custom input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container-custom .checkmark:after {
  left: 8px;
  top: 4px;
  width: 6px;
  height: 11px;
  border: solid white;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}

.label-text {
   font-size: 14px;
   color: #333;
}

/* Product Section */
.vendor-header {
   border-bottom: 1px solid #f2f2f2;
   background: #fafafa;
}

.product-row {
   background: #fff;
   transition: background 0.3s;
}

.product-img-box {
   width: 60px;
   height: 60px;
   flex-shrink: 0;
   border: 1px solid #f2f2f2;
}

.product-img-box img {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.product-name-checkout {
   font-size: 15px;
   line-height: 1.4;
   color: #333;
}

.product-meta-badge {
   display: inline-block;
   padding: 2px 10px;
   background: #f8f9fa;
   border: 1px solid #eee;
   border-radius: 4px;
   font-size: 12px;
   color: #666;
}

.qty-control-disabled {
   background: #fdfdfd;
   color: #999;
}

.qty-btn-disabled {
   width: 20px;
   height: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: not-allowed;
   font-size: 18px;
}

/* Summary Right Column */
.coupon-box {
  display: flex;
  background: white;
  border: 1.5px solid #eee;
  border-radius: 30px;
  padding: 4px 4px 4px 15px;
}

.coupon-input-field {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.apply-coupon-btn {
  background: var(--brand);
  color: white;
  padding: 8px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
}

 
 
.divider {
   height: 1px;
   background: #eee;
}

.text-black { color: #000 !important; }

@media (max-width: 991px) {
   .product-row {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 15px;
   }
   .table-head { display: none !important; }
}
</style>
