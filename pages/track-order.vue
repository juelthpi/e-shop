<template>
  <div class="track-order-page py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          
          <!-- Tracking Search Card -->
          <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-body p-4 p-md-5 text-center">
              <div class="mb-4">
                <div class="icon-box bg-brand-light text-brand rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
                   <i class="fa-solid fa-magnifying-glass-location fs-3"></i>
                </div>
                <h3 class="fw-bold mb-2">Track Your Order</h3>
                <p class="text-muted">Enter your Order ID to see the current status of your shipment.</p>
              </div>
              
              <form @submit.prevent="handleTrackOrder" class="tracking-form text-start">
                  <div class="mb-4">
                     <label class="form-label fw-bold mb-2">Order ID <span class="text-danger">*</span></label>
                     <input 
                        type="text" 
                        v-model="searchOrderId" 
                        class="form-control-custom w-100" 
                        placeholder="e.g. ORD-6G8HJ2K9"
                        required
                     >
                     <div class="form-text ms-1 mt-2 text-muted small"><i class="fa-solid fa-circle-info me-1"></i> You can find this in your order tracking message.</div>
                  </div>
                 <button type="submit" class="primary-btn w-100 justify-content-center  " :disabled="isSearching">
                    <span v-if="isSearching"><i class="fa-solid fa-spinner fa-spin me-2"></i> Tracking...</span>
                    <span v-else>Track Order</span>
                 </button>
              </form>
            </div>
          </div>

          <!-- Tracking Result -->
          <Transition name="fade-up">
            <div v-if="orderResult" class="card border-0 shadow-sm rounded-4 overflow-hidden">
               <div class="card-header bg-white border-bottom p-4 d-flex align-items-center justify-content-between">
                  <div>
                     <h5 class="fw-bold mb-1">Order Status</h5>
                     <p class="mb-0 text-muted small">ID: <span class="fw-bold text-dark">#{{ orderResult.id }}</span></p>
                  </div>
                  <span class="status-badge" :class="orderResult.status.toLowerCase()">{{ orderResult.status }}</span>
               </div>
               
               <div class="card-body p-4">
                  <!-- Progress Bar -->
                 <div class="mb-5 pb-2">
                     <div class="progress-track mb-5  mt-3 position-relative">
                     <div class="progress-line-bg"></div>
                     <div class="progress-line-fill" :style="{ width: progressPercentage + '%' }"></div>
                     
                     <div class="steps d-flex justify-content-between position-relative z-1">
                        <div class="step-item" :class="{ active: currentStep >= 1 }">
                           <div class="step-circle"><i class="fa-solid fa-clipboard-check"></i></div>
                           <span class="step-label">Placed</span>
                           <span class="step-date" v-if="currentStep >= 1">{{ formatDate(orderResult.date) }}</span>
                        </div>
                        <div class="step-item" :class="{ active: currentStep >= 2 }">
                           <div class="step-circle"><i class="fa-solid fa-box-open"></i></div>
                           <span class="step-label">Processing</span>
                        </div>
                        <div class="step-item" :class="{ active: currentStep >= 3 }">
                           <div class="step-circle"><i class="fa-solid fa-truck-fast"></i></div>
                           <span class="step-label">Shipped</span>
                        </div>
                        <div class="step-item" :class="{ active: currentStep >= 4 }">
                           <div class="step-circle"><i class="fa-solid fa-house-chimney-user"></i></div>
                           <span class="step-label">Delivered</span>
                        </div>
                     </div>
                  </div>
                 </div>

                  <!-- Order Info Grid -->
                  <div class="row g-4 mb-4 mt-5 pt-4">
                      <div class="col-md-6">
                        <div class="p-3 bg-light rounded-3 h-100">
                           <h6 class="fw-bold mb-3 small text-uppercase text-muted"><i class="fa-solid fa-location-dot me-1"></i> Delivery To</h6>
                           <p class="fw-bold mb-1">{{ orderResult.shipping?.name || orderResult.shippingAddress?.name }}</p>
                           <p class="mb-1 small text-muted">{{ orderResult.shipping?.address || orderResult.shippingAddress?.address }}</p>
                           <p class="mb-0 small text-muted">{{ orderResult.shipping?.location || orderResult.shippingAddress?.location }}</p>
                           <p class="mt-2 mb-0 small"><i class="fa-solid fa-phone me-1 text-muted"></i> {{ orderResult.shipping?.phone || orderResult.shippingAddress?.phone }}</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="p-3 bg-light rounded-3 h-100">
                           <h6 class="fw-bold mb-3 small text-uppercase text-muted"><i class="fa-solid fa-receipt me-1"></i> Order Summary</h6>
                           <div class="d-flex justify-content-between mb-2 small">
                              <span>Payment</span>
                              <span class="fw-bold text-uppercase">{{ orderResult.paymentMethod === 'cod' ? 'Cash On Delivery' : orderResult.paymentMethod }}</span>
                           </div>
                           <div class="d-flex justify-content-between mb-2 small">
                              <span>Items</span>
                              <span class="fw-bold">{{ orderResult.items.length }}</span>
                           </div>
                           <div class="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Total Amount</span>
                              <span class="fw-bold fs-5 text-brand">৳{{ orderResult.total }}</span>
                           </div>
                        </div>
                      </div>
                  </div>

                  <!-- Order Items (Collapsed/Preview) -->
                  <div>
                     <h6 class="fw-bold mb-3 small text-uppercase text-muted">Items in Order</h6>
                     <div class="item-list">
                        <div v-for="item in orderResult.items" :key="item.id || item.cartItemId" class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom last-no-border">
                           <div class="item-img rounded border p-1 bg-white">
                              <img :src="item.image" :alt="item.name" class="w-100 h-100 object-fit-cover">
                           </div>
                           <div>
                              <p class="fw-bold mb-0 small">{{ item.name }}</p>
                              <div class="d-flex flex-wrap gap-2 text-muted small mb-0">
                                 <span>Qty: {{ item.quantity }}</span>
                                 <span v-if="item.size" class="border-start ps-2">Size: {{ item.size }}</span>
                                 <span v-if="item.color" class="border-start ps-2">Color: {{ typeof item.color === 'object' ? item.color.name : item.color }}</span>
                              </div>
                           </div>
                           <div class="ms-auto fw-bold small">
                              ৳{{ item.price }}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </Transition>

          <!-- Not Found Message -->
           <Transition name="fade">
            <div v-if="searchError" class="alert alert-danger border-0 shadow-sm rounded-3 mt-4 text-center p-4">
                <i class="fa-solid fa-circle-exclamation fs-3 mb-2 d-block"></i>
                <h6 class="fw-bold">Order Not Found</h6>
                <p class="mb-0 small">we couldn't find any order with ID "<strong>{{ searchedId }}</strong>". Please check the ID and try again.</p>
            </div>
           </Transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { orders } = useUser()

const searchOrderId = ref('')
const isSearching = ref(false)
const orderResult = ref(null)
const searchError = ref(false)
const searchedId = ref('')

const currentStep = computed(() => {
   if(!orderResult.value) return 0;
   const status = orderResult.value.status?.toLowerCase() || 'pending';
   if(status === 'cancelled') return 0; // Or handle cancelled specially
   if(status === 'delivered') return 4;
   if(status === 'shipped') return 3;
   if(status === 'processing') return 2;
   return 1; // Pending
});

const progressPercentage = computed(() => {
    switch(currentStep.value) {
        case 1: return 0;
        case 2: return 33;
        case 3: return 66;
        case 4: return 100;
        default: return 0;
    }
});

const handleTrackOrder = async () => {
    if(!searchOrderId.value.trim()) return;
    
    isSearching.value = true;
    searchError.value = false;
    orderResult.value = null;
    searchedId.value = searchOrderId.value;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Search in orders array (from useUser/localStorage)
    // Note: In a real app with Guest Checkout, we'd hit an API. 
    // Here we search local "database".
    const found = orders.value.find(o => 
        o.id.toLowerCase() === searchOrderId.value.trim().toLowerCase()
    );

    if(found) {
        orderResult.value = found;
    } else {
        searchError.value = true;
    }

    isSearching.value = false;
}

const formatDate = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
</script>

<style scoped>
.track-order-page {
    min-height: 80vh;
}

.icon-box {
    width: 80px;
    height: 80px;
}

.bg-brand-light { background-color: #fff0eb; }
.text-brand { color: var(--brand); }

/* Progress Track */
.progress-track {
    height: 4px;
    margin: 40px 0;
}

.progress-line-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #e9ecef;
    border-radius: 4px;
}

.progress-line-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #10b981; /* Green success */
    border-radius: 4px;
    transition: width 1s ease-in-out;
}

.steps {
    top: -18px;
    width: 100%;
    padding: 0 10px;
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    width: 80px;
}

.step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e1;
    margin-bottom: 8px;
    transition: all 0.4s ease;
}

.step-item.active .step-circle {
    border-color: #10b981;
    background: #10b981;
    color: white;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
}

.step-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    transition: color 0.3s;
}

.step-item.active .step-label {
    color: #10b981;
}

.step-date {
    font-size: 10px;
    color: #94a3b8;
    margin-top: 2px;
}

/* Status Badges */
.status-badge {
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
}
.status-badge.pending { background: #fff7ed; color: #c2410c; }
.status-badge.processing { background: #eff6ff; color: #1d4ed8; }
.status-badge.shipped { background: #f0fdf4; color: #15803d; }
.status-badge.delivered { background: #15803d; color: white; }

.item-img {
    width: 50px;
    height: 50px;
}

.last-no-border:last-child {
    border-bottom: none !important;
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
}

/* Transitions */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  max-height: 1000px;
  overflow: hidden;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(20px);
}
</style>
