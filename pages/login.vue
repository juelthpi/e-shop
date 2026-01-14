<template>
  <div class="login-page bg-light min-h-100vh d-flex flex-column">
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container d-flex justify-content-center">
        <div class="auth-card shadow-sm overflow-hidden bg-white rounded-5 border-0">
          <div class="row g-0">
            <!-- Left Side: Image (Visible on Desktop) -->
            <div class="col-lg-6 d-none d-lg-block">
              <div class="auth-img-wrapper h-100 position-relative">
                <img src="/assets/images/thumbanils/auth.jpg" alt="Sign In" class="auth-image">
                <div class="auth-overlay"></div>
              </div>
            </div>

            <!-- Right Side: Form -->
            <div class="col-lg-6">
              <div class="auth-form-wrapper p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                <div class="text-center mb-5">
                  <h2 class="auth-title">Sign In</h2>
                  <p class="text-muted small mt-2">Welcome back! Please enter your details</p>
                </div>

                <form @submit.prevent="handleLogin" class="login-form">
                  <!-- Phone Field with Integrated Country Code -->
                  <div class="form-group mb-4">
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
                        v-model="form.phone" 
                        class="form-control-minimal flex-grow-1 px-3 border-0" 
                        placeholder="017XXX XXXXXX" 
                        required
                       >
                    </div>
                  </div>

                  <!-- Password Field -->
                  <div class="form-group mb-2">
                    <label class="form-label fw-bold mb-2">Password <span class="text-danger">*</span></label>
                    <input 
                      type="password" 
                      v-model="form.password" 
                      class="form-control-custom w-100" 
                      placeholder="Enter password" 
                      required
                    >
                  </div>

                  <!-- Forgot Password Link -->
                  <div class="text-end mb-5">
                    <nuxt-link to="/forgot-password" class="text-brand small fw-bold">Forgot Password?</nuxt-link>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="primary-btn login-btn py-3 justify-content-center fw-bold w-100" :disabled="isSubmitting">
                    <i v-if="isSubmitting" class="fa-solid fa-circle-notch fa-spin me-2"></i>
                    Sign In
                  </button>

                  <!-- Link to Sign Up -->
                  <div class="text-center mt-5">
                    <p class="text-muted">Don't have an account? <nuxt-link to="/signup" class="text-brand fw-bold">Sign Up</nuxt-link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { loginOrUpdateUser } = useUser()

const form = ref({
    phone: '',
    password: ''
})

const isSubmitting = ref(false)
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

const handleLogin = async () => {
    isSubmitting.value = true
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Log the user in (mock)
    loginOrUpdateUser({
        name: 'Demo User',
        phone: selectedCountry.value.code + form.value.phone,
        email: 'user@example.com',
        avatar: 'https://i.pravatar.cc/150?u=demo'
    })
    
    isSubmitting.value = false
    navigateTo('/user-dashboard')
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
.login-page { background: #fdfdfd; }
.x-small { font-size: 10px; }
</style>
