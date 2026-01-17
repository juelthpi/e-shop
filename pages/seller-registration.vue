<template>
  <div class="seller-registration-page bg-light min-h-100vh d-flex flex-column">
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container d-flex justify-content-center">
        <div class="auth-card shadow-sm overflow-hidden bg-white rounded-5 border-0">
          <div class="row g-0">
            <!-- Left Side: Image (Visible on Desktop) -->
            <div class="col-lg-5 d-none d-lg-block">
              <div class="auth-img-wrapper h-100 position-relative">
                <img src="/assets/images/thumbanils/auth.jpg" alt="Seller Registration" class="auth-image">
                <div class="auth-overlay"></div>
                
                <div class="position-absolute bottom-0 start-0 w-100 p-5 z-2 text-white">
                    <h2 class="fw-bold mb-3">Expand Your Business</h2>
                    <p class="opacity-75">Join our marketplace and reach millions of customers instantly.</p>
                </div>
              </div>
            </div>

            <!-- Right Side: Form -->
            <div class="col-lg-7">
              <div class="auth-form-wrapper p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                <div class="text-center mb-4">
                  <h2 class="auth-title">Become a Seller</h2>
                  <p class="text-muted small mt-2">Fill in your business details to get started</p>
                </div>

                <form @submit.prevent="handleRegistration" class="seller-form">
                  <!-- Company & Proprietor Name -->
                  <div class="row g-3 mb-4">
                      <div class="col-md-6">
                        <label class="form-label fw-bold mb-2">Company Name <span class="text-danger">*</span></label>
                        <input 
                          type="text" 
                          v-model="form.companyName" 
                          class="form-control-custom w-100" 
                          placeholder="e.g. Fashion House" 
                          required
                        >
                      </div>
                      <div class="col-md-6">
                        <label class="form-label fw-bold mb-2">Proprietor Name <span class="text-danger">*</span></label>
                        <input 
                          type="text" 
                          v-model="form.proprietorName" 
                          class="form-control-custom w-100" 
                          placeholder="e.g. John Doe" 
                          required
                        >
                      </div>
                  </div>

                  <!-- Contact Number -->
                  <div class="form-group mb-4">
                    <label class="form-label fw-bold mb-2">Contact Number <span class="text-danger">*</span></label>
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
                                 </template>
                               </div>
                            </div>
                          </Transition>
                       </div>

                       <!-- Phone Number Input -->
                       <input 
                        type="tel" 
                        v-model="form.phone" 
                        class="form-control-minimal flex-grow-1 px-3 border-0 py-1" 
                        placeholder="017XXX XXXXXX" 
                        required
                       >
                    </div>
                  </div>
                  
                  <!-- WhatsApp & Website -->
                  <div class="row g-3 mb-4">
                      <div class="col-md-6">
                        <label class="form-label fw-bold mb-2">WhatsApp URL <span class="text-danger">*</span></label>
                        <input 
                          type="url" 
                          v-model="form.whatsapp" 
                          class="form-control-custom w-100" 
                          placeholder="https://wa.me/..." 
                          required
                        >
                      </div>
                      <div class="col-md-6">
                        <label class="form-label fw-bold mb-2">Website <span class="text-muted fw-normal">(Optional)</span></label>
                        <input 
                          type="url" 
                          v-model="form.website" 
                          class="form-control-custom w-100" 
                          placeholder="https://yourwebsite.com" 
                        >
                      </div>
                  </div>

                  <!-- Company Address -->
                  <div class="form-group mb-4">
                    <label class="form-label fw-bold mb-2">Company Address <span class="text-danger">*</span></label>
                    <textarea 
                      v-model="form.address" 
                      class="form-control-custom w-100" 
                      style="min-height: 100px; border-radius: 12px;"
                      placeholder="Enter full office/business address"
                      required
                    ></textarea>
                  </div>
                  
                  <!-- Social Accounts -->
                  <div class="form-group mb-5">
                     <label class="form-label fw-bold mb-2 d-flex justify-content-between align-items-center">
                        <span>Social Accounts</span>
                        <button type="button" @click="addSocialLink" class="btn btn-sm btn-brand-light font-12 fw-bold text-brand rounded-pill px-3">
                            <i class="fa-solid fa-plus me-1"></i> Add New
                        </button>
                     </label>
                     
                     <div class="d-flex flex-column gap-3">
                        <div v-for="(social, index) in form.socials" :key="index" class="d-flex gap-2">
                             <div class="flex-grow-1 position-relative">
                                <span class="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                                    <i class="fa-solid fa-link"></i>
                                </span>
                                <input 
                                  type="url" 
                                  v-model="form.socials[index]" 
                                  class="form-control-custom w-100 ps-5" 
                                  placeholder="Paste social profile link..." 
                                >
                             </div>
                             <button type="button" @click="removeSocialLink(index)" class="btn btn-light rounded-3 text-danger px-3 border" v-if="form.socials.length > 1">
                                <i class="fa-solid fa-trash-can"></i>
                             </button>
                        </div>
                     </div>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="primary-btn py-3 justify-content-center  " :disabled="isSubmitting">
                    <i v-if="isSubmitting" class="fa-solid fa-circle-notch fa-spin me-2"></i>
                    Register as Seller
                  </button>

                  <div class="text-center mt-5">
                    <p class="text-muted">Want to shop instead? <nuxt-link to="/signup" class="text-brand fw-bold">Create User Account</nuxt-link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Toast -->
    <Transition name="toast-pop">
      <div v-if="showSuccessMsg" class="success-toast">
        <div class="d-flex align-items-center gap-3">
          <div class="toast-icon bg-success-light">
             <i class="fa-solid fa-store text-success"></i>
          </div>
          <div class="d-flex flex-column">
             <span class="fw-bold text-dark">Registration Successful!</span>
             <span class="text-muted small">Your seller application has been submitted.</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const isSubmitting = ref(false)
const showSuccessMsg = ref(false)

const form = ref({
    companyName: '',
    proprietorName: '',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    socials: ['']
})

// Validation & Phone Logic
const showCountryList = ref(false)
const countrySearch = ref('')
const isLoadingCountries = ref(true)
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

// Social Links Logic
const addSocialLink = () => {
    form.value.socials.push('')
}

const removeSocialLink = (index) => {
    form.value.socials.splice(index, 1)
}

// Submit Logic
const handleRegistration = async () => {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Seller Data:", {
        ...form.value,
        fullPhone: selectedCountry.value.code + form.value.phone
    })
    
    isSubmitting.value = false
    showSuccessMsg.value = true
    
    setTimeout(() => {
        showSuccessMsg.value = false
        // Here you might redirect, e.g., navigateTo('/seller-dashboard')
        // navigateTo('/') 
    }, 3000)
}

onMounted(() => {
    fetchCountries()
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
</script>

<style scoped>
.seller-registration-page { background: #fdfdfd; }
.x-small { font-size: 10px; }
.auth-card {
    max-width: 1400px; /* Wider card for seller form */
}
</style>
