<template>
  <div class="forgot-password-page bg-light min-h-100vh d-flex flex-column">
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container d-flex justify-content-center">
        <div class="auth-card shadow-sm overflow-hidden bg-white rounded-5 border-0">
          <div class="row g-0">
            <!-- Left Side: Image (Visible on Desktop) -->
            <div class="col-lg-6 d-none d-lg-block">
              <div class="auth-img-wrapper h-100 position-relative">
                <img src="/assets/images/thumbanils/auth.jpg" alt="Forgot Password" class="auth-image">
                <div class="auth-overlay"></div>
              </div>
            </div>

            <!-- Right Side: Form -->
            <div class="col-lg-6">
              <div class="auth-form-wrapper p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                <div class="text-center mb-4">
                  <h2 class="auth-title">Forgot Password?</h2>
                  <p class="text-muted small mt-2">No worries! Choose your recovery method below.</p>
                </div>

                <!-- Forgot Password Method Tabs -->
                <div class="auth-tabs d-flex p-1 bg-light rounded-4 mb-4">
                  <button 
                    class="auth-tab flex-grow-1 py-3" 
                    :class="{ active: resetMethod === 'phone' }"
                    @click="resetMethod = 'phone'"
                  >
                    <i class="fa-solid fa-phone me-2"></i> Phone
                  </button>
                  <button 
                    class="auth-tab flex-grow-1 py-3" 
                    :class="{ active: resetMethod === 'email' }"
                    @click="resetMethod = 'email'"
                  >
                    <i class="fa-solid fa-envelope me-2"></i> Email
                  </button>
                </div>

                <form @submit.prevent="handleReset" class="forgot-form">
                  <!-- Phone Field (Conditional) -->
                  <div v-if="resetMethod === 'phone'" class="form-group mb-5">
                    <label class="form-label fw-bold mb-2">Phone <span class="text-danger">*</span></label>
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
                                          <span class="phone-country-name">{{ c.name }}</span>
                                          <span class="phone-country-code text-muted small">{{ c.code }}</span>
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
                        v-model="phone" 
                        class="form-control-minimal flex-grow-1 px-3 border-0" 
                        placeholder="017XXX XXXXXX" 
                        :required="resetMethod === 'phone'"
                       >
                    </div>
                  </div>

                  <!-- Email Field (Conditional) -->
                  <div v-else class="form-group mb-5">
                    <label class="form-label fw-bold mb-2">Email Address <span class="text-danger">*</span></label>
                    <input 
                      type="email" 
                      v-model="email" 
                      class="form-control-custom w-100" 
                      placeholder="example@mail.com" 
                      :required="resetMethod === 'email'"
                    >
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="primary-btn reset-btn py-3 justify-content-center fw-bold w-100" :disabled="isSubmitting">
                    <i v-if="isSubmitting" class="fa-solid fa-circle-notch fa-spin me-2"></i>
                    Send OTP Code
                  </button>

                  <!-- Link to Login -->
                  <div class="text-center mt-5">
                    <p class="text-muted">Remember your password? <nuxt-link to="/login" class="text-brand fw-bold">Sign In</nuxt-link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Toast Notification -->
    <Transition name="toast-pop">
      <div v-if="showSuccessToast" class="success-toast">
        <div class="d-flex align-items-center gap-3">
          <div class="toast-icon bg-success-light">
             <i class="fa-solid fa-circle-check text-success"></i>
          </div>
          <div class="d-flex flex-column">
             <span class="fw-bold text-dark">Success!</span>
             <span class="text-muted small">{{ successMessage }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const resetMethod = ref('phone') // 'phone' or 'email'
const phone = ref('')
const email = ref('')
const isSubmitting = ref(false)
const showCountryList = ref(false)
const countrySearch = ref('')
const isLoadingCountries = ref(true)
const showSuccessToast = ref(false)
const successMessage = ref('')

const countries = ref([
    { name: 'Bangladesh', code: '+880', flag: 'https://flagcdn.com/w40/bd.png', iso: 'BD' }
])

const selectedCountry = ref(countries.value[0])

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
        
        selectedCountry.value = countries.value[0]
    } catch (error) {
        console.error('Error fetching countries:', error)
    } finally {
        isLoadingCountries.value = false
    }
}

onMounted(() => {
    fetchCountries()
})

const filteredCountries = computed(() => {
    if (!countrySearch.value) return countries.value
    return countries.value.filter(c => 
        c.name.toLowerCase().includes(countrySearch.value.toLowerCase()) || 
        c.code.includes(countrySearch.value)
    )
})

const selectCountry = (country) => {
    selectedCountry.value = country
    showCountryList.value = false
    countrySearch.value = ''
}

const handleReset = async () => {
    if (resetMethod.value === 'phone' && !phone.value) return
    if (resetMethod.value === 'email' && !email.value) return

    isSubmitting.value = true
    // Simulate API process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (resetMethod.value === 'phone') {
        successMessage.value = `OTP code sent to ${selectedCountry.value.code}${phone.value}`
    } else {
        successMessage.value = `Reset link sent to ${email.value}`
    }
    
    showSuccessToast.value = true
    
    isSubmitting.value = false

    // Show toast for 3 seconds, then redirect
    setTimeout(() => {
        showSuccessToast.value = false
        navigateTo('/verify-otp')
    }, 3000)
}

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
</script>

<style scoped>
.forgot-password-page { background: #fdfdfd; }
.x-small { font-size: 10px; }

/* Auth Tabs */
.auth-tabs {
    border: 1px solid #eee;
}

.auth-tab {
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: #888;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-tab i {
    font-size: 16px;
    opacity: 0.6;
}

.auth-tab.active {
    background: #fff;
    color: var(--brand);
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.auth-tab.active i {
    opacity: 1;
}

.fade-down-enter-active, .fade-down-leave-active { transition: all 0.2s ease; }
.fade-down-enter-from, .fade-down-leave-to { opacity: 0; transform: translateY(-10px); }

.phone-input-group { background: #f9f9f9; border: 1.5px solid #ececec; transition: all 0.3s ease; }
.phone-input-group:focus-within { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 4px rgba(69, 40, 41, 0.1); }
.country-trigger { cursor: pointer; background: transparent; transition: background 0.2s; }
.country-trigger img, .country-option img { width: 30px; height: auto; }
.country-trigger:hover { background: rgba(0,0,0,0.02); }
.form-control-minimal { background: transparent; outline: none; font-size: 16px; width: 100%; }
.country-dropdown { position: absolute; top: 100%; left: 0; width: 250px; background: white; z-index: 1000; margin-top: 8px; border-radius: 12px; overflow: hidden; }
.country-list-scroll { max-height: 250px; overflow-y: auto; }
.country-option { padding: 10px 16px; cursor: pointer; transition: all 0.2s; border-bottom: 1px solid #f9f9f9; }
.country-option:last-child { border-bottom: none; }
.country-option:hover { background: #f8f9fa; }
.country-name { font-size: 14px; font-weight: 600; color: #333; }
.country-code { font-size: 13px; }
.x-small { font-size: 10px; }
.fade-down-enter-active, .fade-down-leave-active { transition: all 0.2s ease; }
.fade-down-enter-from, .fade-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
