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
        <div class="stepper-line" :class="{ active: isReviewing || isOrderConfirmed || cart.length === 0 }"></div>
        <div class="stepper-item" :class="{ active: isReviewing || isOrderConfirmed || cart.length === 0 }">
          <div class="step-num">
            <i v-if="isOrderConfirmed || cart.length === 0" class="fa-solid fa-check animate-check check-4"></i>
            <template v-else>4</template>
          </div>
          <div class="step-label">Payment</div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cart.length === 0 && !isOrderConfirmed" class="empty-checkout-container py-5 text-center mt-5">
          <div class="empty-cart-icon mb-4">
              <i class="fa-solid fa-cart-shopping-slash text-muted opacity-25" style="font-size: 80px;"></i>
          </div>
          <h2 class="fw-bold mb-3">Your Cart is Empty</h2>
          <p class="text-muted mb-5 mx-auto" style="max-width: 400px;">Looks like you haven't added any products to your cart yet. Please add some items to proceed with checkout.</p>
          <NuxtLink to="/" class="primary-btn px-5 py-3 d-inline-flex justify-content-center">
              <i class="fa-solid fa-basket-shopping me-2"></i> Start Shopping
          </NuxtLink>
      </div>

      <Transition v-else name="fade-slide" mode="out-in">
        <div v-if="!isReviewing" key="checkout-form">
          <div class="row gy-4">
            <!-- Left Column: Shipping & Products -->
            <div class="col-lg-8">
              <!-- Product Table Card -->
              <div class="checkout-card p-0 overflow-hidden mb-4">
            <!-- Header -->
            <div class="p-3 border-bottom d-flex align-items-center gap-3 bg-white">
              <label class="checkbox-container-custom mb-0">
                <input type="checkbox" checked disabled>
                <span class="checkmark"></span>
                <span class="label-text fw-medium">Select All</span>
              </label>
            </div>
            
            <div class="product-list-container">
                <div>
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
                              <p class="product-name-checkout mb-2 fw-medium">{{ item.name }}</p>
                              <div class="d-flex gap-2 flex-wrap">
                                <div v-if="item.color" class="product-meta-badge">
                                  <i class="fa-solid fa-palette me-1"></i>Color: {{ typeof item.color === 'object' ? item.color.name : item.color }}
                                </div>
                                <div class="product-meta-badge">
                                  <i class="fa-solid fa-ruler me-1"></i>Size: {{ item.size || 'Medium' }}
                                </div>
                              </div>
                           </div>
                        </div>
                        <div style="flex: 1" class="text-center fw-bold text-black fs-5">
                           ৳{{ (parseFloat(item.price.toString().replace(/[^\d.]/g, '')) * item.quantity).toFixed(2) }}
                        </div>
                        <div style="flex: 1" class="text-end pe-4">
                           <div class="qty-control-active d-inline-flex align-items-center gap-3 p-1 px-3 rounded-pill border bg-white">
                              <button class="qty-btn" @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                                <i class="fa-solid fa-minus"></i>
                              </button>
                              <span class="qty-val fw-bold">{{ item.quantity }}</span>
                              <button class="qty-btn" @click="increaseQuantity(item)">
                                <i class="fa-solid fa-plus"></i>
                              </button>
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
            </div>
          </div>

          <!-- Shipping Form Card -->
          <div class="checkout-card mb-4 p-4 p-md-5 text-start">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h5 class="fw-bold mb-0 d-flex align-items-center gap-2">
                <i class="fa-solid fa-truck-fast text-brand"></i> Shipping Information
              </h5>
              
            </div>
            <div class="row gy-4">
              <!-- Left Column: Personal Info -->
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Full Name <span class="text-danger">*</span></label>
                  <input type="text" v-model="fullName" class="form-control-custom" placeholder="Enter your full name">
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Phone Number <span class="text-danger">*</span></label>
                  <div class="phone-input-group d-flex align-items-center form-control-custom position-relative">
                       <!-- Custom Selector -->
                       <div class="country-selector-wrapper position-relative" v-outside-click="() => showCountryList = false">
                          <div 
                            class="phone-country-trigger d-flex align-items-center gap-2 px-3 h-100 border-end" 
                            @click="showCountryList = !showCountryList"
                          >
                             <img :src="selectedCountry.flag" alt="Flag" class="phone-flag-img shadow-sm">
                             <span class="code-text fw-bold">{{ selectedCountry.code }}</span>
                             <i class="fa-solid fa-angle-down x-small text-muted"></i>
                          </div>

                          <!-- Dropdown Menu -->
                          <Transition name="fade-down">
                            <div v-if="showCountryList" class="phone-country-dropdown shadow-lg border-0 rounded-4 mt-2">
                               <!-- Search Filter -->
                               <div class="px-3 border-bottom sticky-top bg-white rounded-top-4">
                                  <input 
                                    type="text" 
                                    v-model="countrySearch" 
                                    class="form-control border-0 bg-light py-3 p-lg" 
                                    placeholder="Search country..."
                                    @click.stop
                                  >
                               </div>
                               <div class="phone-country-list-scroll">
                                 <div v-if="isLoadingCountries" class="text-center py-4">
                                     <i class="fa-solid fa-spinner fa-spin text-brand"></i>
                                     <p class="small text-muted mt-2">Loading countries...</p>
                                 </div>
                                 <template v-else>
                                     <div 
                                       v-for="c in filteredCountries" 
                                       :key="c.code + c.name" 
                                       class="phone-country-option d-flex align-items-center gap-3 px-3 py-2"
                                       @click="selectCountry(c)"
                                     >
                                        <img :src="c.flag" alt="Flag" class="phone-flag-img shadow-sm">
                                        <div class="d-flex flex-column">
                                          <span class="phone-country-name text-start">{{ c.name }}</span>
                                          <span class="phone-country-code text-muted small text-start">{{ c.code }}</span>
                                        </div>
                                     </div>
                                     <div v-if="filteredCountries.length === 0" class="text-center py-3 text-muted small">
                                        No country found
                                     </div>
                                 </template>
                               </div>
                            </div>
                          </Transition>
                       </div>

                       <!-- Phone Number Input -->
                       <input 
                        type="tel" 
                        v-model="localPhone" 
                        @input="updatePhoneNumber"
                        class="form-control-minimal flex-grow-1 px-3 border-0" 
                        placeholder="017XXX XXXXXX" 
                       >
                    </div>
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Email Address 
                    <!-- <span class="text-muted fs-7">(Optional)</span> -->
                  </label>
                  <input type="email" v-model="email" class="form-control-custom" placeholder="example@mail.com">
                </div>
                <div class="form-group mb-4">
                  <label class="form-label fw-bold mb-2">Detailed Address <span class="text-danger">*</span></label>
                  <input type="text" v-model="detailedAddress" class="form-control-custom mb-3" placeholder="Building / House No / Floor / Street">
                  <textarea class="form-control-custom py-3" v-model="additionalInstructions" placeholder="Additional instructions (e.g. Landmark, Near Mosque)" rows="2"></textarea>
                </div>
              </div>

              <!-- Right Column: Location & Map -->
              <div class="col-md-6">
                <div class="mb-4">
                    <label class="form-label fw-bold mb-2">Location Selection</label>
                    <div class="row g-2">
                      <div class="col-6 position-relative">
                        <div class="searchable-select-wrapper" @click="toggleSelect('division')">
                          <div class="selected-val text-truncate small">{{ selectedDivision || 'Division' }}</div>
                          <i class="fa-solid fa-angle-down small"></i>
                          <div v-if="activeSelect === 'division'" class="search-dropdown shadow-lg p-2" @click.stop>
                            <input type="text" v-model="divisionSearch" placeholder="Search..." class="search-input mb-2">
                            <ul class="options-list">
                              <li v-for="d in filteredDivisions" :key="d" @click="selectOption('division', d)">{{ d }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 position-relative">
                        <div class="searchable-select-wrapper" @click="toggleSelect('district')">
                          <div class="selected-val text-truncate small">{{ selectedDistrict || 'District' }}</div>
                          <i class="fa-solid fa-angle-down small"></i>
                          <div v-if="activeSelect === 'district'" class="search-dropdown shadow-lg p-2" @click.stop>
                            <input type="text" v-model="districtSearch" placeholder="Search..." class="search-input mb-2">
                            <ul class="options-list">
                              <li v-for="d in filteredDistricts" :key="d" @click="selectOption('district', d)">{{ d }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 position-relative">
                        <div class="searchable-select-wrapper" @click="toggleSelect('upazila')">
                          <div class="selected-val text-truncate small">{{ selectedUpazila || 'Police Station / Upazila' }}</div>
                          <i class="fa-solid fa-angle-down small"></i>
                          <div v-if="activeSelect === 'upazila'" class="search-dropdown shadow-lg p-2" @click.stop>
                            <input type="text" v-model="upazilaSearch" placeholder="Search..." class="search-input mb-2">
                            <ul class="options-list">
                              <li v-for="u in filteredUpazilas" :key="u" @click="selectOption('upazila', u)">{{ u }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <!-- Delivery Options: Area & Speed -->
                <div class="mb-4">
                  <div class="row g-3">
                    <!-- Delivery Area / Zone -->
                    <div class="col-12">
                      <label class="form-label fw-bold mb-2">Delivery Zone <span class="text-danger">*</span></label>
                      <div class="position-relative">
                        <div class="searchable-select-wrapper" @click="toggleSelect('deliveryZone')">
                          <div class="selected-val text-truncate small">
                            <span v-if="selectedDeliveryZone">
                              <i class="fa-solid fa-location-dot me-2 text-brand"></i>
                              {{ selectedDeliveryZone.name }} - ৳{{ selectedDeliveryZone.price }}
                            </span>
                            <span v-else class="text-muted">Select delivery zone</span>
                          </div>
                          <i class="fa-solid fa-angle-down small"></i>
                          <div v-if="activeSelect === 'deliveryZone'" class="search-dropdown shadow-lg p-2" @click.stop>
                            <input type="text" v-model="deliveryZoneSearch" placeholder="Search zone..." class="search-input mb-2">
                            <ul class="options-list">
                              <li 
                                v-for="zone in filteredDeliveryZones" 
                                :key="zone.id" 
                                @click="selectDeliveryZone(zone)"
                                class="delivery-zone-option"
                              >
                                <div class="d-flex align-items-center justify-content-between w-100">
                                  <div class="d-flex align-items-center gap-2">
                                    <i class="fa-solid fa-map-pin text-brand small"></i>
                                    <span>{{ zone.name }}</span>
                                  </div>
                                  <span class="badge bg-brand-light text-brand px-2 py-1 small fw-bold">৳{{ zone.price }}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Delivery Type -->
                    <div class="col-12">
                      <label class="form-label fw-bold mb-2">Delivery Type</label>
                      <div class="delivery-option-grid">
                        <div 
                          class="delivery-option-item" 
                          :class="{ active: deliveryType === 'regular' }"
                          @click="deliveryType = 'regular'"
                        >
                          <div class="option-icon"><i class="fa-solid fa-clock"></i></div>
                          <div class="option-content">
                            <span class="fw-bold d-block">Regular</span>
                            <span class="text-muted small">4-7 Days</span>
                          </div>
                          <div class="option-price">Free</div>
                        </div>
                        <div 
                          class="delivery-option-item" 
                          :class="{ active: deliveryType === 'express' }"
                          @click="deliveryType = 'express'"
                        >
                          <div class="option-icon"><i class="fa-solid fa-bolt text-warning"></i></div>
                          <div class="option-content">
                            <span class="fw-bold d-block">Express</span>
                            <span class="text-muted small">2-4 Days</span>
                          </div>
                          <div class="option-price">+৳50</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Google Maps Picker (Optional Now) -->
                <div class="form-group mb-4">
                   <div class="map-picker-container rounded-3 overflow-hidden border" @click="openMapModal">
                      <div class="map-placeholder position-relative cursor-pointer" style="height: 140px;">
                         <div v-if="locationSelected" id="map-preview" class="h-100 w-100"></div>
                         <div v-else class="h-100 w-100 position-relative">
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" alt="Mock Map" class="w-100 h-100 object-fit-cover opacity-40">
                            <div class="map-overlay d-flex flex-column align-items-center justify-content-center">
                               <button class="btn btn-dark rounded-pill px-3 shadow-sm fw-bold btn-sm">Pick from Map</button>
                            </div>
                         </div>
                      </div>
                      <div class="p-2 bg-white border-top d-flex align-items-center justify-content-between">
                         <span class="fs-8 fw-medium text-dark ms-2">{{ locationSelected ? 'Location Selected' : 'No location selected' }}</span>
                         <button v-if="locationSelected" class="text-brand border-0 bg-transparent fw-bold fs-8" @click.stop="openMapModal">Change</button>
                      </div>
                   </div>
                </div>

                <div class="form-group mb-0">
                  <label class="form-label fw-bold mb-2">Address Label</label>
                  <div class="d-flex gap-2">
                    <button class="label-btn py-2 flex-grow-1" :class="{ active: deliveryLabel === 'home' }" @click="deliveryLabel = 'home'">
                      <i class="fa-solid fa-house"></i> Home
                    </button>
                    <button class="label-btn py-2 flex-grow-1" :class="{ active: deliveryLabel === 'office' }" @click="deliveryLabel = 'office'">
                      <i class="fa-solid fa-building"></i> Office
                    </button>
                  </div>
                </div>

                <label class="checkbox-container-custom mt-3">
                  <input type="checkbox" checked>
                  <span class="checkmark"></span>
                  <span class="label-text small">Make it default address</span>
                </label>

                <label class="checkbox-container-custom mt-3" v-if="!user">
                  <input type="checkbox" v-model="createAccount">
                  <span class="checkmark"></span>
                  <span class="label-text small">Create an account with this information</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Map Selection Modal -->
          <Transition name="fade">
            <div v-if="isMapModalOpen" class="map-modal-overlay" @click.self="closeMapModal">
              <div class="map-modal-content">
                <div class="modal-header-custom">
                  <h6 class="mb-0">Select Delivery Location</h6>
                  <button class="close-btn" @click="closeMapModal"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body-custom position-relative">
                   <div id="map" class="h-100 w-100"></div>
                   <div class="map-instruction">Click on your delivery location</div>
                </div>
                <div class="modal-footer-custom">
                  <div class="location-status text-muted small">
                     <i class="fa-solid fa-circle-check text-success me-1" v-if="tempLocation"></i>
                     {{ tempLocation ? 'Location pinned!' : 'Please click on the map' }}
                  </div>
                  <button class="primary-btn w-auto px-5" :disabled="!tempLocation" @click="confirmLocation">Confirm Location</button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Payment Method Card -->
          <div class="checkout-card p-4 p-md-5 mb-4 position-relative">
            <!-- Validation Overlay -->
            <Transition name="fade">
              <div v-if="!isFormValid" class="payment-lock-overlay d-flex flex-column align-items-center justify-content-center text-center p-4">
                <div class="lock-icon mb-3">
                  <i class="fa-solid fa-lock"></i>
                </div>
                <h6 class="fw-bold mb-2">Payment Section Locked</h6>
                <p class="small text-muted mb-0">Please fill in your name, phone, address, and select a location to unlock payment options.</p>
              </div>
            </Transition>

           <div class="d-flex align-items-center gap-2 justify-content-between mb-4">
             <h5 class="fw-bold  d-flex align-items-center gap-2">
              <i class="fa-solid fa-credit-card text-brand"></i> Payment Method
            </h5>
            <button 
                v-if="user" 
                class="btn btn-brand-light  rounded-pill px-3 fw-bold"
                @click="autoFillFromProfile"
              >
                <i class="fa-solid fa-address-book me-2"></i> Use Saved Info
              </button>
           </div>
            <div class="payment-options-grid mb-4">
              <!-- COD Option -->
              <div 
                class="payment-method-item" 
                :class="{ active: selectedPaymentMethod === 'cod' }"
                @click="selectedPaymentMethod = 'cod'"
              >
                <div class="method-icon">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div class="method-info">
                  <span class="fw-bold d-block">Cash on Delivery</span>
                  <small class="text-muted">Pay when you receive</small>
                </div>
                <div class="method-check">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>

              <!-- Online Payment Option -->
              <div 
                class="payment-method-item" 
                :class="{ active: selectedPaymentMethod === 'online' }"
                @click="selectedPaymentMethod = 'online'; if(!selectedOnlineProvider) selectedOnlineProvider = 'bkash'"
              >
                <div class="method-icon">
                  <i class="fa-solid fa-globe"></i>
                </div>
                <div class="method-info">
                  <span class="fw-bold d-block">Online Payment</span>
                  <small class="text-muted">Pay securely online</small>
                </div>
                <div class="method-check">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </div>

            <!-- Online Payment Providers -->
            <Transition name="fade-slide">
              <div v-if="selectedPaymentMethod === 'online'" class="online-providers-selection">
                <p class="fw-medium mb-3 small text-muted text-uppercase letter-spacing-1">Select Provider:</p>
                <div class="providers-grid">
                  <div 
                    v-for="provider in onlineProviders" 
                    :key="provider.id"
                    class="provider-card"
                    :class="{ active: selectedOnlineProvider === provider.id }"
                    @click="selectedOnlineProvider = provider.id"
                  >
                    <div class="provider-logo">
                      <img :src="provider.logo" :alt="provider.name">
                    </div>
                    <span>{{ provider.name }}</span>
                    <div class="mini-check" v-if="selectedOnlineProvider === provider.id">
                      <i class="fa-solid fa-check"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="col-lg-4">
          <div class="checkout-card p-4 sticky-side-card">
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
                  <span>Delivery Charge</span>
                  <small class="text-brand">{{ deliveryType === 'express' ? 'Express' : 'Regular' }}{{ selectedDeliveryZone ? ' - ' + selectedDeliveryZone.name : '' }}</small>
                </div>
                <span class="text-dark fw-bold">৳{{ shippingCharge.toFixed(2) }}</span>
              </div>
              <div class="summary-item d-flex justify-content-between mb-3 text-muted">
                <span>Discount</span>
                <span class="text-dark fw-bold">৳0</span>
              </div>
              <div class="divider my-3"></div>
              <div class="summary-item d-flex justify-content-between mb-4">
                <h6 class="fw-bold mb-0 text-black">Total Payable</h6>
                <h6 class="fw-bold text-brand mb-0">৳{{ totalPayable.toFixed(2) }}</h6>
              </div>
            </div>

            <button class="primary-btn justify-content-center w-100" @click="handlePlaceOrder">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

        <div v-else key="order-review">
          <div class="review-view-container text-start">
            <div class="row gy-4">
              <div class="col-lg-8">
                <div class="checkout-card p-4 p-md-5 mb-4 text-start">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h5 class="fw-bold m-0 d-flex align-items-center gap-2">
                    <i class="fa-solid fa-rectangle-list text-brand"></i> Review Your Order
                  </h5>
                  <button class="edit-review-btn" @click="goBackToEdit">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Info
                  </button>
                </div>

                <div class="review-grid row gy-4">
                  <!-- Info Block: Recipient -->
                  <div class="col-md-6">
                    <div class="review-block p-4 rounded-4 border">
                      <h6 class="text-muted small text-uppercase fw-bold mb-3 letter-spacing-1">Recipient Details</h6>
                      <div class="d-flex align-items-center gap-3 mb-2">
                        <div class="info-avatar">{{ fullName.charAt(0) }}</div>
                        <div>
                          <span class="d-block fw-bold">{{ fullName }}</span>
                          <small class="text-muted">{{ phoneNumber }}</small>
                        </div>
                      </div>
                      <div v-if="email" class="d-flex align-items-center gap-2 text-muted small mt-2">
                        <i class="fa-solid fa-envelope"></i> {{ email }}
                      </div>
                      <div class="mt-2">
                         <span class="badge bg-light text-dark border px-3 py-2 rounded-pill small">
                           <i class="fa-solid " :class="deliveryLabel === 'home' ? 'fa-house' : 'fa-building'"></i>
                           {{ deliveryLabel.charAt(0).toUpperCase() + deliveryLabel.slice(1) }}
                         </span>
                      </div>
                    </div>
                  </div>

                  <!-- Info Block: Delivery Address -->
                  <div class="col-md-6">
                    <div class="review-block p-4 rounded-4 border h-100">
                      <h6 class="text-muted small text-uppercase fw-bold mb-3 letter-spacing-1">Delivery Address</h6>
                      <p class="mb-1 fw-bold">{{ detailedAddress }}</p>
                      <p class="text-muted small mb-0">{{ selectedUpazila }}, {{ selectedDistrict }}, {{ selectedDivision }}</p>
                      <div class="mt-2 d-flex gap-2 flex-wrap">
                        <span v-if="selectedDeliveryZone" class="badge bg-primary-subtle text-primary border-primary-subtle px-2 py-1 small">
                          <i class="fa-solid fa-location-dot me-1"></i>{{ selectedDeliveryZone.name }} - ৳{{ selectedDeliveryZone.price }}
                        </span>
                        <span class="badge bg-warning-subtle text-warning-emphasis border-warning-subtle px-2 py-1 small">{{ deliveryType === 'express' ? 'Express' : 'Regular' }}</span>
                      </div>
                      <div v-if="additionalInstructions" class="mt-3 p-2 bg-light rounded small text-muted italic">
                        "{{ additionalInstructions }}"
                      </div>
                    </div>
                  </div>

                  <!-- Info Block: Payment Method -->
                  <div class="col-md-12">
                     <div class="review-block p-4 rounded-4 border bg-brand-light">
                        <div class="d-flex align-items-center justify-content-between">
                           <div>
                              <h6 class="text-muted small text-uppercase fw-bold mb-2 letter-spacing-1">Payment Method</h6>
                              <div class="d-flex align-items-center gap-3">
                                 <i class="fa-solid fa-shield-halved text-brand"></i>
                                 <span class="fw-bold">{{ selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (' + (onlineProviders.find(p => p.id === selectedOnlineProvider)?.name || 'Generic') + ')' }}</span>
                              </div>
                           </div>
                           <div class="text-brand fs-4">
                              <i class="fa-solid " :class="selectedPaymentMethod === 'cod' ? 'fa-hand-holding-dollar' : 'fa-credit-card'"></i>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <!-- Product Preview Table -->
                <div class="mt-5">
                   <h6 class="text-muted small text-uppercase fw-bold mb-3 letter-spacing-1">Items in your order</h6>
                   <div class="review-product-table border rounded-4 overflow-hidden">
                      <div v-for="item in cart" :key="item.cartItemId" class="review-product-row p-3 d-flex align-items-center gap-3 border-bottom last-border-0">
                         <img :src="item.image" class="review-item-img" alt="">
                         <div class="flex-grow-1">
                            <h6 class="mb-0 fw-bold small">{{ item.name }}</h6>
                            <span class="text-muted fs-8">Qty: {{ item.quantity }} × ৳{{ parseFloat(item.price.replace(/[^\d.]/g, '')).toFixed(2) }}</span>
                         </div>
                         <div class="text-end fw-bold">
                            ৳{{ (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2) }}
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <!-- Review Summary Side -->
            <div class="col-lg-4">
              <div class="checkout-card p-4 sticky-side-card">
                 <h5 class="fw-bold mb-4">Confirm Order</h5>
                 <div class="summary-list mb-4">
                    <div class="summary-item d-flex justify-content-between mb-2">
                       <span class="text-muted">Subtotal</span>
                       <span class="fw-bold">৳{{ subtotal.toFixed(2) }}</span>
                    </div>
                    <div class="summary-item d-flex justify-content-between mb-2">
                       <span class="text-muted">Shipping ({{ deliveryType === 'express' ? 'Express' : 'Regular' }})</span>
                       <span class="fw-bold">৳{{ shippingCharge.toFixed(2) }}</span>
                    </div>
                    <div class="divider my-3"></div>
                    <div class="summary-item d-flex justify-content-between align-items-center">
                       <span class="h6 fw-bold mb-0">Total Payable</span>
                       <span class="h4 fw-bold text-brand mb-0">৳{{ totalPayable.toFixed(2) }}</span>
                    </div>
                 </div>

                 <p class="small text-muted mb-4 p-3 bg-light rounded-3">
                    By clicking "Confirm Order", you agree to our Terms & Conditions and Privacy Policy.
                 </p>

                 <div class="d-flex flex-column gap-3">
                    <button class="primary-btn justify-content-center py-4 fs-5" @click="confirmFinalOrder">
                       <i class="fa-solid fa-paper-plane me-2"></i> Confirm Order
                    </button>
                    <button class="btn btn-link text-decoration-none text-muted small fw-bold" @click="goBackToEdit">
                       Back to edit information
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Validation Error Modal -->
      <Transition name="fade">
        <div v-if="showValidationModal" class="validation-modal-overlay" @click="showValidationModal = false">
          <div class="validation-modal-content" @click.stop>
            <div class="validation-icon-wrapper mb-3">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h5 class="fw-bold mb-2">{{ validationModalTitle }}</h5>
            <p class="text-muted mb-4">{{ validationModalMessage }}</p>
            <button class="primary-btn justify-content-center" @click="handleModalClose">Got it</button>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="isOrderConfirmed" class="success-modal-overlay">
          <div class="success-modal-content text-center p-5">
             <div class="success-icon-wrapper mb-4">
                <i class="fa-solid fa-circle-check"></i>
             </div>
             <h2 class="fw-bold mb-2">Order Placed Successfully!</h2>
             <p class="text-muted mb-4 px-md-5">Thank you for your purchase. We've received your order and the Order ID is generated for tracking.</p>
             
             <div class="order-id-badge p-4 rounded-4 mb-4 position-relative">
                <div class="row g-3 justify-content-center">
                  <div class="col-md-6" :class="{'border-end': createAccount}">
                    <span class="d-block text-muted small text-uppercase fw-bold mb-1">Your Order ID</span>
                    <div class="d-flex align-items-center justify-content-center gap-3">
                      <span class="h3 fw-bold text-brand mb-0">{{ orderId }}</span>
                      <button class="copy-id-btn" @click="copyToClipboard(orderId)" :class="{ copied: copiedId === orderId }">
                        <i class="fa-solid" :class="copiedId === orderId ? 'fa-check' : 'fa-copy'"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="createAccount && tempPassword">
                    <span class="d-block text-muted small text-uppercase fw-bold mb-1">Temp Password</span>
                    <div class="d-flex align-items-center justify-content-center gap-3">
                      <span class="h3 fw-bold text-dark mb-0 font-monospace">{{ tempPassword }}</span>
                      <button class="copy-id-btn" @click="copyToClipboard(tempPassword)" :class="{ copied: copiedId === tempPassword }">
                        <i class="fa-solid" :class="copiedId === tempPassword ? 'fa-check' : 'fa-copy'"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <Transition name="scale">
                   <div v-if="copiedId" class="copy-status-floating">Copied!</div>
                </Transition>
             </div>

             <div class="d-flex flex-column gap-3">
                <NuxtLink v-if="createAccount" to="/user-dashboard" class="primary-btn w-100 justify-content-center">Go to Dashboard</NuxtLink>
                <NuxtLink to="/" class="btn btn-outline-dark rounded-pill p-lg py-3 fw-bold text-decoration-none">Continue Shopping</NuxtLink>
             </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const { cart, subtotal } = useCart()
const { user, loginOrUpdateUser, addOrder } = useUser()

const breadcrumbItems = [
  { name: 'Home', link: '/' },
  { name: 'Checkout', link: '' }
]

// Quantity Control Functions
const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}


const deliveryLabel = ref('home')
const activeSelect = ref(null)
const locationSelected = ref(false)
const isMapModalOpen = ref(false)
const tempLocation = ref(null)

// Shipping Form Fields
// Shipping Form Fields
const fullName = ref(user.value?.name || '')
const phoneNumber = ref(user.value?.phone || '')
const email = ref(user.value?.email || '')
const detailedAddress = ref(user.value?.address || '')
const additionalInstructions = ref('')

// Phone Input Logic
const showCountryList = ref(false)
const countrySearch = ref('')
const isLoadingCountries = ref(true)
const countries = ref([
    { name: 'Bangladesh', code: '+880', flag: 'https://flagcdn.com/w40/bd.png', iso: 'BD' }
])
const selectedCountry = ref(countries.value[0])
const localPhone = ref('')

const filteredCountries = computed(() => {
    if (!countrySearch.value) return countries.value
    return countries.value.filter(c => 
        c.name.toLowerCase().includes(countrySearch.value.toLowerCase()) || 
        c.code.includes(countrySearch.value)
    )
})

const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2')
        const data = await response.json()
        
        const formatted = data
            .filter(c => c.idd?.root)
            .map(c => ({
                name: c.name.common,
                code: c.idd.root + (c.idd.suffixes?.length === 1 ? c.idd.suffixes[0] : ''),
                flag: c.flags.png || `https://flagcdn.com/w40/${c.cca2.toLowerCase()}.png`,
                iso: c.cca2
            }))
            .sort((a, b) => a.name.localeCompare(b.name))

        const bdIndex = formatted.findIndex(c => c.iso === 'BD')
        if (bdIndex > -1) {
            const bd = formatted.splice(bdIndex, 1)[0]
            countries.value = [bd, ...formatted]
        } else {
            countries.value = formatted
        }
        
        if(!phoneNumber.value) {
           selectedCountry.value = countries.value[0]
        }
    } catch (error) {
        console.error('Error fetching countries:', error)
    } finally {
        isLoadingCountries.value = false
    }
}

const selectCountry = (country) => {
    selectedCountry.value = country
    showCountryList.value = false
    countrySearch.value = ''
    updatePhoneNumber()
}

const updatePhoneNumber = () => {
   if(!localPhone.value) {
        phoneNumber.value = '' 
   } else {
        phoneNumber.value = selectedCountry.value.code + localPhone.value
   }
}

onMounted(async () => {
    await fetchCountries()
    if(phoneNumber.value) {
        // Try to match country code
        const country = countries.value.find(c => phoneNumber.value.startsWith(c.code))
        if(country) {
            selectedCountry.value = country
            localPhone.value = phoneNumber.value.replace(country.code, '')
        } else {
             localPhone.value = phoneNumber.value
        }
    }
})

watch(localPhone, () => {
    updatePhoneNumber()
})

const vOutsideClick = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};

// Payment Selection
const selectedPaymentMethod = ref('cod')
const selectedOnlineProvider = ref(null)

// Delivery Zones - Admin will be able to define multiple zones
const deliveryZones = [
  { id: 'dhaka-city', name: 'Dhaka City Center', price: 60, area: 'inside' },
  { id: 'dhaka-suburban', name: 'Dhaka Suburban', price: 80, area: 'inside' },
  { id: 'uttara', name: 'Uttara', price: 70, area: 'inside' },
  { id: 'mirpur', name: 'Mirpur', price: 70, area: 'inside' },
  { id: 'gulshan', name: 'Gulshan', price: 60, area: 'inside' },
  { id: 'banani', name: 'Banani', price: 60, area: 'inside' },
  { id: 'dhanmondi', name: 'Dhanmondi', price: 65, area: 'inside' },
  { id: 'mohammadpur', name: 'Mohammadpur', price: 75, area: 'inside' },
  { id: 'savar', name: 'Savar', price: 100, area: 'outside' },
  { id: 'gazipur', name: 'Gazipur', price: 120, area: 'outside' },
  { id: 'narayanganj', name: 'Narayanganj', price: 120, area: 'outside' },
  { id: 'chittagong', name: 'Chittagong', price: 150, area: 'outside' },
  { id: 'sylhet', name: 'Sylhet', price: 150, area: 'outside' },
  { id: 'rajshahi', name: 'Rajshahi', price: 140, area: 'outside' },
  { id: 'khulna', name: 'Khulna', price: 140, area: 'outside' },
  { id: 'barisal', name: 'Barisal', price: 130, area: 'outside' },
]

const selectedDeliveryZone = ref(null)
const deliveryZoneSearch = ref('')

// Delivery Options
const deliveryType = ref('regular') // 'regular' or 'express'

const isOrderConfirmed = ref(false)
const orderId = ref(null)
const tempPassword = ref(null)
const copiedId = ref(null)
const isReviewing = ref(false)
const showValidationModal = ref(false)
const validationModalTitle = ref('Incomplete Information')
const validationModalMessage = ref('Please fill up all required shipping information to proceed with your order.')

const createAccount = ref(true)

const isFormValid = computed(() => {
  return fullName.value.trim() && 
         phoneNumber.value.trim() && 
         detailedAddress.value.trim() && 
         selectedDivision.value && 
         selectedDistrict.value && 
         selectedUpazila.value &&
         selectedDeliveryZone.value
})

const shippingCharge = computed(() => {
  if (cart.value.length === 0) return 0
  let charge = selectedDeliveryZone.value ? selectedDeliveryZone.value.price : 0
  if (deliveryType.value === 'express') {
    charge += 50
  }
  return charge
})

const totalPayable = computed(() => {
  return subtotal.value + shippingCharge.value
})

const onlineProviders = [
  { id: 'bkash', name: 'bKash', logo: '/assets/images/payments/bkash.png' },
  { id: 'nagad', name: 'Nagad', logo: '/assets/images/payments/nagad.png' },
  { id: 'rocket', name: 'Rocket', logo: '/assets/images/payments/rocket.png' },
  { id: 'card', name: 'Card', logo: '/assets/images/payments/card.png' }
]

const handleModalClose = () => {
    if (cart.value.length === 0) {
        showValidationModal.value = false
        navigateTo('/')
        return
    }
    showValidationModal.value = false
}

const handlePlaceOrder = () => {
    if (cart.value.length === 0) {
        validationModalTitle.value = 'Empty Cart'
        validationModalMessage.value = 'Your cart is empty. Please add some products to checkout.'
        showValidationModal.value = true
        return
    }

    if (!isFormValid.value) {
        validationModalTitle.value = 'Incomplete Information'
        validationModalMessage.value = 'Please fill up all required shipping information to proceed with your order.'
        showValidationModal.value = true
        return
    }
    isReviewing.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const confirmFinalOrder = () => {
    // 1. Generate Order ID
    const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    orderId.value = newOrderId

    // 2. Generate Temp Password and Update User (Only if Create Account is checked)
    if (createAccount.value) {
        const newTempPassword = Math.random().toString(36).substr(2, 6).toUpperCase()
        tempPassword.value = newTempPassword

        // If user exists, we still update their temp password so they can use it for Change Password
        loginOrUpdateUser({
            name: fullName.value,
            phone: phoneNumber.value,
            email: email.value,
            address: detailedAddress.value,
            division: selectedDivision.value,
            district: selectedDistrict.value,
            upazila: selectedUpazila.value,
            avatar: user.value?.avatar || null,
            tempPassword: newTempPassword
        })
    } else {
        tempPassword.value = null
    }

    // 3. Add Order to History
    addOrder({
        id: newOrderId,
        date: new Date().toISOString(),
        items: [...cart.value],
        total: totalPayable.value,
        status: 'Pending',
        paymentMethod: selectedPaymentMethod.value,
        shipping: {
            name: fullName.value,
            phone: phoneNumber.value,
            email: email.value,
            address: detailedAddress.value,
            location: `${selectedUpazila.value}, ${selectedDistrict.value}`,
            deliveryZone: selectedDeliveryZone.value ? selectedDeliveryZone.value.name : null,
            deliveryZonePrice: selectedDeliveryZone.value ? selectedDeliveryZone.value.price : 0,
            deliveryType: deliveryType.value,
            shippingCharge: shippingCharge.value
        }
    })

    // 4. Clear Cart
    cart.value = []

    // 5. Show Success Modal
    isOrderConfirmed.value = true
    isReviewing.value = false 
}

const autoFillFromProfile = () => {
    if (!user.value) return
    
    fullName.value = user.value.name || ''
    phoneNumber.value = user.value.phone || ''
    email.value = user.value.email || ''
    detailedAddress.value = user.value.address || ''
    selectedDivision.value = user.value.division || ''
    selectedDistrict.value = user.value.district || ''
    selectedUpazila.value = user.value.upazila || ''
    locationSelected.value = !!user.value.address // assume if they have address, it's valid
}

const goBackToEdit = () => {
    isReviewing.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyToClipboard = (text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    copiedId.value = text
    setTimeout(() => {
        copiedId.value = null
    }, 2000)
}
let map = null
let marker = null

let previewMap = null

const openMapModal = () => {
    isMapModalOpen.value = true
    document.body.style.overflow = 'hidden'
    
    // Give time for modal animation then init map
    setTimeout(() => {
        initMap()
    }, 400)
}

const closeMapModal = () => {
    isMapModalOpen.value = false
    document.body.style.overflow = ''
    if (map) {
        map.remove()
        map = null
        marker = null
    }
}

const initMap = () => {
    if (typeof L === 'undefined') return

    // Initialize map centered on Bangladesh/Dhaka or previously selected location
    const center = tempLocation.value ? [tempLocation.value.lat, tempLocation.value.lng] : [23.8103, 90.4125]
    map = L.map('map').setView(center, tempLocation.value ? 16 : 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    if (tempLocation.value) {
        marker = L.marker([tempLocation.value.lat, tempLocation.value.lng]).addTo(map)
    }

    // Handle click to place marker
    map.on('click', (e) => {
        const { lat, lng } = e.latlng
        tempLocation.value = { lat, lng }
        
        if (marker) {
            marker.setLatLng([lat, lng])
        } else {
            marker = L.marker([lat, lng]).addTo(map)
        }
    })
}

const initPreviewMap = () => {
    if (typeof L === 'undefined' || !tempLocation.value) return
    
    // Smoothly wait for DOM update
    nextTick(() => {
        if (previewMap) {
            previewMap.remove()
            previewMap = null
        }

        const { lat, lng } = tempLocation.value
        previewMap = L.map('map-preview', {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false
        }).setView([lat, lng], 16)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(previewMap)
        L.marker([lat, lng]).addTo(previewMap)
        
        // Ensure tiles are correctly rendered
        setTimeout(() => previewMap.invalidateSize(), 200)
    })
}

const confirmLocation = () => {
    locationSelected.value = true
    closeMapModal()
    initPreviewMap()
}

// modalPinStyle is no longer needed for Leaflet as it manages markers itself

// Locations Data
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' }
  ],
  script: [
    { src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js' }
  ]
})
const divisions = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh']
const districts = ['Dhaka', 'Narayanganj', 'Gazipur', 'Manikganj', 'Munshiganj', 'Narsingdi']
const upazilas = ['Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar']

// Selection States
const selectedDivision = ref(user.value?.division || '')
const selectedDistrict = ref(user.value?.district || '')
const selectedUpazila = ref(user.value?.upazila || '')

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

// Delivery Zone Filtering
const filteredDeliveryZones = computed(() => {
   if (!deliveryZoneSearch.value) return deliveryZones
   return deliveryZones.filter(zone => zone.name.toLowerCase().includes(deliveryZoneSearch.value.toLowerCase()))
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

const selectDeliveryZone = (zone) => {
   selectedDeliveryZone.value = zone
   deliveryZoneSearch.value = ''
   activeSelect.value = null
}

const closeAllSelects = (e) => {
   if (!e.target.closest('.searchable-select-wrapper')) {
      activeSelect.value = null
   }
}

onMounted(() => {
   window.addEventListener('click', closeAllSelects)
   
   // Auto-set location selected if address exists
   if (user.value?.address) {
       locationSelected.value = true
   }
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
.check-4 { animation-delay: 1.2s; }

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

.sticky-side-card {
  position: sticky;
  top: 20px;
  align-self: flex-start;
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

.delivery-zone-option {
   cursor: pointer;
   border-bottom: 1px solid #f5f5f5;
}

.delivery-zone-option:last-child {
   border-bottom: none;
}

.delivery-zone-option:hover {
   background: linear-gradient(to right, rgba(111, 44, 45, 0.05), rgba(111, 44, 45, 0.02));
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
   display: inline-flex;
   align-items: center;
   gap: 3px;
   padding: 4px 12px;
   background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
   border: 1px solid #dee2e6;
   border-radius: 6px;
   font-size: 11px;
   font-weight: 600;
   color: #495057;
}

.product-meta-badge i {
   font-size: 10px;
   color: var(--brand);
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

/* Active Quantity Controls */
.qty-control-active {
   background: white;
   border-color: #ddd !important;
   box-shadow: 0 2px 8px rgba(0,0,0,0.06);
   transition: all 0.3s;
}

.qty-control-active:hover {
   border-color: var(--brand) !important;
   box-shadow: 0 4px 12px rgba(111, 44, 45, 0.15);
}

.qty-btn {
   width: 28px;
   height: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: #f8f9fa;
   border: none;
   border-radius: 50%;
   cursor: pointer;
   font-size: 11px;
   color: #666;
   transition: all 0.2s;
}

.qty-btn:hover:not(:disabled) {
   background: var(--brand);
   color: white;
   transform: scale(1.1);
}

.qty-btn:disabled {
   opacity: 0.3;
   cursor: not-allowed;
}

.qty-val {
   min-width: 30px;
   text-align: center;
   font-size: 14px;
   color: #333;
}


 
 
.divider {
   height: 1px;
   background: #eee;
}

.text-black { color: #000 !important; }

.sticky-side-card {
  position: sticky;
  top: 120px; /* Offset for header/padding */
  z-index: 10;
  align-self: flex-start; /* Crucial: prevents card from stretching to parent height */
}

@media (max-width: 991px) {
  .sticky-side-card {
    position: static;
  }
}

/* Summary Right Column */
.coupon-box {
  display: flex;
  align-items: center; /* Center input and button vertically */
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
  padding: 8px 15px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

/* Map Picker Styles */
.map-picker-container {
  background: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.map-picker-container:hover {
    border-color: var(--brand) !important;
}

.map-placeholder {
  height: 200px;
  background: #eee;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2;
}

.pulse-circle {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0 rgba(111, 44, 45, 0.4);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(111, 44, 45, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(111, 44, 45, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(111, 44, 45, 0); }
}

.user-marker-fixed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.pin-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pin-wrapper i {
    font-size: 40px;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.pin-shadow {
    width: 20px;
    height: 10px;
    background: rgba(0,0,0,0.2);
    border-radius: 50%;
    filter: blur(2px);
    margin-top: -5px;
}

/* Modal Styles */
.map-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.map-modal-content {
    background: white;
    width: 100%;
    max-width: 900px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}

.modal-header-custom {
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
}

.modal-header-custom h6 { font-size: 18px; color: #1a1a1a; font-weight: 700; }

.close-btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    color: #666;
    transition: all 0.2s;
}

.close-btn:hover { background: #eee; color: #000; transform: rotate(90deg); }

.modal-body-custom {
    height: 500px;
    background: #f8f9fa;
    overflow: hidden;
    cursor: crosshair;
}

.clickable-map { transition: transform 0.3s ease; }
.clickable-map:active { transform: scale(1.02); }

.map-instruction {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 13px;
    pointer-events: none;
    z-index: 5;
}

.modal-pin {
    position: absolute;
    transform: translate(-50%, -100%);
    pointer-events: none;
    z-index: 10;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-footer-custom {
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fafafa;
    border-top: 1px solid #eee;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fs-7 { font-size: 0.85rem; }
.fs-8 { font-size: 0.75rem; }

/* Payment Styles */
.payment-options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.payment-method-item {
    padding: 20px;
    border: 1.5px solid #eee;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
    transition: all 0.3s ease;
}

.payment-method-item:hover {
    border-color: var(--brand);
    background: rgba(111, 44, 45, 0.02);
}

.payment-method-item.active {
    border-color: var(--brand);
    background: rgba(111, 44, 45, 0.05);
}

.method-icon {
    width: 45px;
    height: 45px;
    background: #f8f9fa;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--brand);
}

.method-check {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #eee;
    font-size: 18px;
    transition: all 0.3s ease;
}

.payment-method-item.active .method-check {
    color: var(--brand);
}

.providers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
}

.provider-card {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
}

.provider-card:hover { border-color: var(--brand); }
.provider-card.active {
    border-color: var(--brand);
    background: #fffafa;
    box-shadow: 0 4px 12px rgba(111, 44, 45, 0.1);
}

.provider-logo {
    height: 40px;
    margin-bottom: 8px;
}

.provider-logo img {
    height: 100%;
    width: auto;
    object-fit: contain;
}

.provider-card span { font-size: 13px; font-weight: 600; color: #444; }

.mini-check {
    position: absolute;
    top: 5px;
    right: 8px;
    color: var(--brand);
    font-size: 10px;
}

/* Validation & Overlays */
.payment-lock-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(4px);
    z-index: 10;
    border-radius: 12px;
}

.lock-icon {
    width: 60px;
    height: 60px;
    background: #f8f9fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #adb5bd;
    border: 2px dashed #dee2e6;
}

/* Copy Button */
.copy-id-btn {
    border: none;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 0.2s;
    position: relative;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.copy-id-btn:hover {
    color: var(--brand);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(111, 44, 45, 0.1);
}

.copy-id-btn.copied {
    background: #28a745;
    color: white;
}

.copy-status {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #191919;
    color: white;
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    font-weight: bold;
    pointer-events: none;
}

.copy-status::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #191919;
}

.scale-enter-active, .scale-leave-active { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: translateX(-50%) scale(0.5); }

/* Success Modal */
.success-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.success-modal-content {
    background: white;
    width: 100%;
    max-width: 500px;
    border-radius: 30px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}

.success-icon-wrapper {
    font-size: 80px;
    color: #28a745;
    animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.order-id-badge {
    background: #f8f9fa;
    border: 1px dashed #ddd;
}

/* Review View Styles */
.review-view-container {
    animation: fadeIn 0.5s ease;
}

.edit-review-btn {
    background: #f8f9fa;
    border: 1px solid #eee;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #666;
    transition: all 0.2s;
}

.edit-review-btn:hover {
    background: #eee;
    color: var(--brand);
    border-color: var(--brand);
}

.review-block {
    background: #fff;
    transition: all 0.3s ease;
}

.review-block:hover {
    border-color: var(--brand) !important;
    box-shadow: 0 10px 20px rgba(0,0,0,0.02);
}

.info-avatar {
    width: 45px;
    height: 45px;
    background: var(--brand);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
}

.letter-spacing-1 { letter-spacing: 1px; }

.bg-brand-light {
    background: rgba(111, 44, 45, 0.03);
    border-color: rgba(111, 44, 45, 0.1) !important;
}

.review-product-table { border: 1px solid #f0f0f0; }

.review-product-row {
    transition: background 0.2s;
}

.review-product-row:hover { background: #fafafa; }

.review-item-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #eee;
}

.last-border-0:last-child { border-bottom: none !important; }

.italic { font-style: italic; }

/* Validation Modal */
.validation-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.validation-modal-content {
    background: white;
    border-radius: 20px;
    padding: 40px 30px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    animation: modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalPop {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.validation-icon-wrapper {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 10px 25px rgba(255, 152, 0, 0.3);
}

.validation-icon-wrapper i {
    font-size: 40px;
    color: white;
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Delivery Options */
.delivery-option-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.delivery-option-item {
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
}

.delivery-option-item:hover {
    border-color: rgba(111, 44, 45, 0.3);
    background: rgba(111, 44, 45, 0.02);
}

.delivery-option-item.active {
    border-color: var(--brand);
    background: rgba(111, 44, 45, 0.05);
    box-shadow: 0 4px 15px rgba(111, 44, 45, 0.1);
}

.option-icon {
    width: 32px;
    height: 32px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand);
    font-size: 14px;
}

.delivery-option-item.active .option-icon {
    background: var(--brand);
    color: #fff;
}

.option-content {
    flex-grow: 1;
}

.option-price {
    font-size: 11px;
    font-weight: 800;
    color: var(--brand);
    background: #fff;
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid rgba(111, 44, 45, 0.1);
}

.fs-8 { font-size: 0.75rem; }

@media (max-width: 991px) {
   .product-row {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 15px;
   }
   .table-head { display: none !important; }
   .payment-options-grid { grid-template-columns: 1fr; }
   .delivery-option-grid { grid-template-columns: 1fr; }
}

.copy-status-floating {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 11px;
    z-index: 10;
}
</style>
