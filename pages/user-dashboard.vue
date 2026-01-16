<template>
  <div class="user-dashboard-page py-5 bg-light">
    <div class="container">
      <div class="row g-4">
        <!-- Dashboard Sidebar (Desktop) -->
        <div class="col-xl-3 d-none d-xl-block">
            <div class="dashboard-sidebar desktop-sidebar bg-white rounded-4 p-4 shadow-sm h-100">
                <div class="user-profile-card text-center mb-5">
                    <div class="avatar-circle mx-auto mb-3">
                        <img :src="user?.avatar" alt="User Avatar" class="w-100 h-100 object-fit-cover rounded-circle">
                    </div>
                    <h5 class="fw-bold mb-1">{{ user?.name || 'Guest User' }}</h5>
                    <p class="text-muted small mb-0">{{ user?.phone }}</p>
                </div>

                <div class="dashboard-menu d-flex flex-column gap-2">
                    <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
                        <i class="fa-solid fa-border-all me-3"></i> Overview
                    </button>
                    <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
                        <i class="fa-solid fa-bag-shopping me-3"></i> Order History
                    </button>
                    <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'returns' }" @click="activeTab = 'returns'">
                        <i class="fa-solid fa-rotate-left me-3"></i> Return Orders
                    </button>
                    <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'">
                        <i class="fa-regular fa-user me-3"></i> Account Info
                    </button>
                    <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'password' }" @click="activeTab = 'password'">
                        <i class="fa-solid fa-key me-3"></i> Change Password
                    </button>
                    <!-- <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'address' }" @click="activeTab = 'address'">
                        <i class="fa-solid fa-location-dot me-3"></i> Address
                    </button> -->
                    <button class="menu-item btn text-start border-0 fw-medium text-danger mt-4" @click="handleLogout">
                        <i class="fa-solid fa-right-from-bracket me-3"></i> Logout
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-xl-9 col-12">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="fade-in">
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h4 class="fw-bold text-brand mb-0">Overview</h4>
                    <!-- Mobile Toggle Button -->
                    <button class="btn btn-brand-light d-xl-none rounded-pill  py-3 px-4 p-lg fw-bold   d-flex align-items-center gap-2" @click="isSidebarOpen = true">
                        <i class="fa-solid fa-bars-staggered"></i> Menu
                    </button>
                </div>
                <p class="mb-4">Welcome Back, <strong>{{ user?.name }}!</strong></p>

                <!-- Stats Grid -->
                <div class="row g-3 mb-5">
                    <div class="col-sm-4 col-12">
                        <div class="stat-card bg-white p-3 rounded-4 shadow-sm h-100">
                            <div class="stat-icon bg-pink-light text-pink rounded-3 mb-3 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-bag-shopping"></i>
                            </div>
                            <h5 class="fw-bold mb-1">{{ orders.length }}</h5>
                            <span class="text-muted  ">Total Orders</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-12">
                        <div class="stat-card bg-white p-3 rounded-4 shadow-sm h-100">
                            <div class="stat-icon bg-orange-light text-orange rounded-3 mb-3 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-check-to-slot"></i>
                            </div>
                            <h5 class="fw-bold mb-1">0</h5>
                            <span class="text-muted  ">Total Completed</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-12">
                        <div class="stat-card bg-white p-3 rounded-4 shadow-sm h-100">
                            <div class="stat-icon bg-purple-light text-purple rounded-3 mb-3 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-rotate"></i>
                            </div>
                            <h5 class="fw-bold mb-1">0</h5>
                            <span class="text-muted">Total Returned</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <h5 class="fw-bold mb-0">Order History</h5>
                    <button class="btn btn-brand-light rounded-pill px-4 fw-bold  " @click="activeTab = 'orders'">Show Full History</button>
                </div>

                <div class="bg-white rounded-4 shadow-sm p-4 min-h-300">
                    <div v-if="orders.length > 0" class="table-responsive">
                        <table class="table align-middle">
                            <thead class="text-muted   text-uppercase">
                                <tr>
                                    <th class="fw-bold border-0">Order ID</th>
                                    <th class="fw-bold border-0">Products</th>
                                    <th class="fw-bold border-0">Status</th>
                                    <th class="fw-bold border-0">Payment</th>
                                    <th class="fw-bold border-0">Amount</th>
                                    <th class="fw-bold border-0 text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders.slice(0, 5)" :key="order.id">
                                    <td class="fw-bold text-brand">#{{ order.id }}</td>
                                    <td>{{ order.items.length }} Items</td>
                                    <td>
                                        <span class="badge bg-warning-light text-warning-dark px-3 py-2 rounded-pill">Pending</span>
                                    </td>
                                    <td>{{ order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Online' }}</td>
                                    <td class="fw-bold">৳{{ order.total }}</td>
                                    <td class="text-end">
                                        <button class="btn btn-sm btn-light rounded-circle"><i class="fa-regular fa-eye"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="text-center py-5">
                       <div class="empty-img-container mb-3 mx-auto" style="width: 200px;">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7261249.png?f=webp" alt="No Data" class="w-100 opacity-75">
                       </div>
                       <h6 class="fw-bold text-muted">No Data Found!</h6>
                    </div>
                </div>
            </div>

            <!-- Account Info Tab -->
            <div v-if="activeTab === 'account'" class="fade-in">
                <div class="bg-white rounded-4 shadow-sm p-4 pt-5">
                    <h5 class="fw-bold mb-4">Account Information</h5>
                    
                    <div class="row g-4">
                        <!-- Profile Image Section -->
                        <div class="col-12 mb-2">
                            <div class="d-flex align-items-center gap-4">
                                <div class="position-relative">
                                    <div class="avatar-circle" style="width: 120px; height: 120px;">
                                        <img :src="profileForm.avatar" alt="Profile" class="w-100 h-100 object-fit-cover rounded-circle">
                                    </div>
                                    <label for="avatarUpload" class="avatar-edit-badge position-absolute bottom-0 end-0 bg-brand text-white rounded-circle shadow-sm" style="width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #fff;">
                                        <i class="fa-solid fa-camera small"></i>
                                        <input type="file" id="avatarUpload" hidden @change="handleImageUpload" accept="image/*">
                                    </label>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-1">Profile Photo</h6>
                                    <p class="text-muted small mb-0">Accepted formats: JPG, PNG. Max size 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Basic Info Fields -->
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">Full Name</label>
                            <input type="text" v-model="profileForm.name" class="form-control rounded-3 py-3" style="font-size: 16px;" placeholder="Enter your name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">Phone Number</label>
                            <div class="phone-input-group position-relative p-1">
                                <!-- Country Selector -->
                                <div class="country-selector position-relative" v-outside-click="() => showCountryList = false">
                                    <div class="phone-country-trigger d-flex align-items-center gap-2 px-3 py-2" @click="showCountryList = !showCountryList">
                                        <img :src="selectedCountry.flag" alt="Flag" class="phone-flag-img shadow-sm">
                                        <span class="fw-bold small">{{ selectedCountry.code }}</span>
                                        <i class="fa-solid fa-chevron-down x-small text-muted"></i>
                                    </div>

                                    <!-- Country Dropdown -->
                                    <Transition name="fade-down">
                                        <div v-if="showCountryList" class="phone-country-dropdown shadow-lg">
                                            <div class="p-2 border-bottom sticky-top bg-white">
                                                <div class="input-group input-group-sm">
                                                    <span class="input-group-text bg-light border-0"><i class="fa-solid fa-magnifying-glass text-muted"></i></span>
                                                    <input 
                                                        type="text" 
                                                        v-model="countrySearch" 
                                                        class="form-control bg-light border-0" 
                                                        placeholder="Search country..."
                                                        @click.stop
                                                    >
                                                </div>
                                            </div>
                                            <div class="phone-country-list-scroll">
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
                                            </div>
                                        </div>
                                    </Transition>
                                </div>

                                <!-- Phone Number Input -->
                                <input 
                                    type="tel" 
                                    v-model="profileForm.phone" 
                                    class="form-control-minimal flex-grow-1 px-3 border-0 py-2" 
                                    placeholder="017XXX XXXXXX"
                                >
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">Email Address</label>
                            <input type="email" v-model="profileForm.email" class="form-control rounded-3 py-3" style="font-size: 16px;" placeholder="Enter email address">
                        </div>
                        
                        <!-- Location Fields -->
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">Division</label>
                            <select v-model="profileForm.division" class="form-select rounded-3 py-3" style="font-size: 16px;">
                                <option value="">Select Division</option>
                                <option v-for="d in divisions" :key="d" :value="d">{{ d }}</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">District</label>
                            <select v-model="profileForm.district" class="form-select rounded-3 py-3" style="font-size: 16px;">
                                <option value="">Select District</option>
                                <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold text-muted">Upazila</label>
                            <select v-model="profileForm.upazila" class="form-select rounded-3 py-3" style="font-size: 16px;">
                                <option value="">Select Upazila</option>
                                <option v-for="u in upazilas" :key="u" :value="u">{{ u }}</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold text-muted">Detailed Address</label>
                            <textarea v-model="profileForm.address" class="form-control rounded-3 py-3" style="font-size: 16px;" rows="3" placeholder="House no, Street name..."></textarea>
                        </div>

                        <div class="col-12 pt-3">
                            <button @click="saveProfile" class="primary-btn justify-content-center" :disabled="isUpdating">
                                <i v-if="isUpdating" class="fa-solid fa-spinner fa-spin me-2"></i>
                                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Change Password Tab -->
            <div v-if="activeTab === 'password'" class="fade-in">
                <div class="bg-white rounded-4 shadow-sm p-4 pt-5">
                    <h5 class="fw-bold mb-4">Change Password</h5>
                    <p class="text-muted small mb-4">Choose a strong password to keep your account secure.</p>
                    
                    <div class="row g-4" style="max-width: 500px;">
                        <div class="col-12">
                            <label class="form-label fw-bold text-muted d-flex align-items-center justify-content-between">
                                <span>Current Password</span>
                                <span v-if="user?.tempPassword" class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 small">Using Temp Password</span>
                            </label>
                            <div class="position-relative">
                                <input :type="showPass ? 'text' : 'password'" v-model="passwordForm.currentPassword" class="form-control rounded-3 py-3" style="font-size: 16px;" placeholder="Enter current password">
                                <button class="btn position-absolute end-0 top-50 translate-middle-y border-0 text-muted" @click="showPass = !showPass">
                                    <i class="fa-solid" :class="showPass ? 'fa-eye-slash' : 'fa-eye'"></i>
                                </button>
                            </div>
                            <p v-if="user?.tempPassword" class="text-muted small mt-2">Your temporary password is: <strong class="text-dark font-monospace">{{ user.tempPassword }}</strong></p>
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold text-muted">New Password</label>
                            <input type="password" v-model="passwordForm.newPassword" class="form-control rounded-3 py-3" style="font-size: 16px;" placeholder="Enter new password">
                        </div>
                        <div class="col-12">
                            <label class="form-label fw-bold text-muted">Confirm New Password</label>
                            <input type="password" v-model="passwordForm.confirmPassword" class="form-control rounded-3 py-3" style="font-size: 16px;" placeholder="Confirm new password">
                        </div>

                        <div class="col-12 pt-3">
                            <button @click="updatePassword" class="primary-btn justify-content-center" :disabled="isUpdatingPassword || !isPasswordFormValid">
                                <i v-if="isUpdatingPassword" class="fa-solid fa-spinner fa-spin me-2"></i>
                                {{ isUpdatingPassword ? 'Updating...' : 'Update Password' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order History Tab -->
            <div v-if="activeTab === 'orders'" class="fade-in">
                <div class="bg-white rounded-4 shadow-sm p-4 pt-5">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h5 class="fw-bold mb-0">Full Order History</h5>
                        <span class="badge bg-brand-light text-brand px-3 py-2 rounded-pill">{{ orders.length }} Orders Found</span>
                    </div>
                    
                    <div v-if="orders.length > 0" class="table-responsive">
                        <table class="table table-hover align-middle custom-dashboard-table">
                            <thead>
                                <tr>
                                    <th class="ps-3">Order ID</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th class="text-end pe-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.id" class="cursor-pointer">
                                    <td class="ps-3 fw-bold text-brand">#{{ order.id }}</td>
                                    <td class="text-muted small">{{ formatDate(order.date) }}</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <span class="fw-medium">{{ order.items.length }} Items</span>
                                        </div>
                                    </td>
                                    <td class="fw-bold text-dark">৳{{ order.total }}</td>
                                    <td>
                                        <span class="order-status-badge outline-pending">
                                            {{ order.status || 'Pending' }}
                                        </span>
                                    </td>
                                    <td class="text-end pe-3">
                                        <button class="btn btn-view-order btn-sm rounded-pill px-3">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-else class="text-center py-5">
                        <div class="empty-img-container mb-4 mx-auto" style="width: 180px;">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7261249.png?f=webp" alt="No Data" class="w-100 opacity-50">
                        </div>
                        <h5 class="fw-bold text-muted mb-2">No Orders Found!</h5>
                        <p class="text-muted small mb-4">You haven't placed any orders yet. Start shopping and they'll show up here.</p>
                        <NuxtLink to="/" class="primary-btn px-5 justify-content-center mx-auto d-inline-flex">Start Shopping</NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Other Tabs Placeholder -->
            <div v-else-if="!['overview', 'account', 'password', 'orders'].includes(activeTab)" class="fade-in bg-white rounded-4 p-5 text-center shadow-sm">
                <div class="py-5">
                    <i class="fa-solid fa-person-digging text-brand fs-1 mb-3"></i>
                    <h4 class="fw-bold">Under Construction</h4>
                    <p class="text-muted">This section is coming soon!</p>
                </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Mobile/Tablet Side Menu (Off-canvas) -->
    <Transition name="fade">
      <div v-if="isSidebarOpen" class="dashboard-sidebar-overlay d-xl-none" @click="isSidebarOpen = false"></div>
    </Transition>
    
    <div class="dashboard-sidebar mobile-sidebar bg-white shadow-lg d-xl-none" :class="{ 'show': isSidebarOpen }">
        <button class="btn-close position-absolute top-0 end-0 m-3" @click="isSidebarOpen = false"></button>
        <div class="p-4 pt-5">
            <div class="user-profile-card text-center mb-5">
                <div class="avatar-circle mx-auto mb-3">
                    <img :src="user?.avatar" alt="User Avatar" class="w-100 h-100 object-fit-cover rounded-circle">
                </div>
                <h5 class="fw-bold mb-1">{{ user?.name || 'Guest User' }}</h5>
                <p class="text-muted   mb-0">{{ user?.phone }}</p>
            </div>

            <div class="dashboard-menu d-flex flex-column gap-2">
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'; isSidebarOpen = false">
                    <i class="fa-solid fa-border-all me-3"></i> Overview
                </button>
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'; isSidebarOpen = false">
                    <i class="fa-solid fa-bag-shopping me-3"></i> Order History
                </button>
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'returns' }" @click="activeTab = 'returns'; isSidebarOpen = false">
                    <i class="fa-solid fa-rotate-left me-3"></i> Return Orders
                </button>
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'; isSidebarOpen = false">
                    <i class="fa-regular fa-user me-3"></i> Account Info
                </button>
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'password' }" @click="activeTab = 'password'; isSidebarOpen = false">
                    <i class="fa-solid fa-key me-3"></i> Change Password
                </button>
                <button class="menu-item btn text-start border-0 fw-medium" :class="{ active: activeTab === 'address' }" @click="activeTab = 'address'; isSidebarOpen = false">
                    <i class="fa-solid fa-location-dot me-3"></i> Address
                </button>
                <button class="menu-item btn text-start border-0 fw-medium text-danger mt-4" @click="handleLogout">
                    <i class="fa-solid fa-right-from-bracket me-3"></i> Logout
                </button>
            </div>
        </div>
    </div>

    <!-- Universal Toast Notification -->
    <Transition name="toast-pop">
      <div v-if="showToast" class="success-toast" :class="{ 'error-toast': toastType === 'error' }">
        <div class="d-flex align-items-center gap-3">
          <div class="toast-icon" :class="toastType === 'success' ? 'bg-success-light' : 'bg-danger-light'">
             <i class="fa-solid" :class="toastType === 'success' ? 'fa-circle-check text-success' : 'fa-circle-exclamation text-danger'"></i>
          </div>
          <div class="d-flex flex-column">
             <span class="fw-bold text-dark">{{ toastType === 'success' ? 'Success!' : 'Error!' }}</span>
             <span class="text-muted small">{{ toastMsg }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
const { user, orders, logout, updateProfile } = useUser()
const router = useRouter()

// Country Selector State
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
        
        // Match current phone code
        if (user.value?.phone) {
            const matchedCountry = countries.value.find(c => user.value.phone.startsWith(c.code))
            if (matchedCountry) {
                selectedCountry.value = matchedCountry
                // Set phone without code if possible
                profileForm.value.phone = user.value.phone.replace(matchedCountry.code, '')
            }
        }
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

const activeTab = ref('overview')
const isSidebarOpen = ref(false)
const isUpdating = ref(false)
const saveSuccess = ref(false)

const divisions = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh']
const districts = ['Dhaka', 'Narayanganj', 'Gazipur', 'Manikganj', 'Munshiganj', 'Narsingdi']
const upazilas = ['Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar']

const profileForm = ref({
    name: user.value?.name || '',
    phone: user.value?.phone || '',
    email: user.value?.email || '',
    address: user.value?.address || '',
    division: user.value?.division || '',
    district: user.value?.district || '',
    upazila: user.value?.upazila || '',
    avatar: user.value?.avatar || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
})

const passwordForm = ref({
    currentPassword: user.value?.tempPassword || '',
    newPassword: '',
    confirmPassword: ''
})
const showPass = ref(false)
const isUpdatingPassword = ref(false)
const passwordSaveSuccess = ref(false)

const showToast = ref(false)
const toastMsg = ref('')
const toastType = ref('success')

const triggerToast = (msg, type = 'success') => {
    toastMsg.value = msg
    toastType.value = type
    showToast.value = true
    setTimeout(() => {
        showToast.value = false
    }, 3000)
}

const isPasswordFormValid = computed(() => {
    return passwordForm.value.currentPassword && 
           passwordForm.value.newPassword && 
           passwordForm.value.confirmPassword
})

onMounted(() => {
    if (!user.value) {
        navigateTo('/')
    }
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

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profileForm.value.avatar = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const saveProfile = async () => {
    isUpdating.value = true
    saveSuccess.value = false
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const finalProfile = { 
        ...profileForm.value,
        phone: selectedCountry.value.code + profileForm.value.phone
    }
    
    updateProfile(finalProfile)
    
    isUpdating.value = false
    triggerToast('Profile updated successfully!')
}

const updatePassword = async () => {
    if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
        triggerToast('Please fill up all password fields', 'error')
        return
    }
    
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        triggerToast('Passwords do not match!', 'error')
        return
    }
    
    isUpdatingPassword.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isUpdatingPassword.value = false
    triggerToast('Password updated successfully!')
    
    // Clear temp password if it existed
    if (user.value?.tempPassword) {
        updateProfile({ tempPassword: null })
    }

    // Clear form
    passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
}

const handleLogout = () => {
    logout()
    navigateTo('/')
}

const formatDate = (isoString) => {
    if (!isoString) return 'N/A'
    const date = new Date(isoString)
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
</script>

<style scoped>
.user-dashboard-page {
    min-height: 80vh;
}

.custom-dashboard-table {
    border-collapse: separate;
    border-spacing: 0 10px;
    margin-top: -10px;
}

.custom-dashboard-table thead tr th {
    background: #f8f9fa;
    border: none;
    padding: 15px 10px;
    font-size: 13px;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.custom-dashboard-table tbody tr {
    transition: all 0.3s ease;
    background: #fff;
    box-shadow: 0 0 0 0 transparent;
}

.custom-dashboard-table tbody tr:hover {
    background: #fdfdfd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
}

.custom-dashboard-table tbody tr td {
    padding: 20px 10px;
    border-top: 1px solid #f8f9fa;
    border-bottom: 1px solid #f8f9fa;
    background: transparent;
    font-size: 14px;
}

.custom-dashboard-table tbody tr td:first-child {
    border-left: 1px solid #f8f9fa;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.custom-dashboard-table tbody tr td:last-child {
    border-right: 1px solid #f8f9fa;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
}

.order-status-badge {
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
}

.outline-pending {
    border: 1.5px solid #ffc107;
    color: #ca8a04;
    background: #fffbeb;
}

.btn-view-order {
    border: 1.5px solid #ececec;
    background: #fff;
    color: #555;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.2s;
}

.btn-view-order:hover {
    border-color: var(--brand);
    color: var(--brand);
    background: var(--brand-light);
}

.avatar-circle {
    width: 100px;
    height: 100px;
    border: 3px solid var(--brand);
    padding: 3px;
    border-radius: 50%;
}

.menu-item {
    padding:6px 15px;
    border-radius: 8px;
    color: #6c757d;
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 500;
}

.menu-item:hover, .menu-item.active {
    background-color: var(--brand-light); 
    color: var(--brand);
}

.stat-icon {
    width: 45px;
    height: 45px;
    font-size: 20px;
}

.bg-pink-light { background: #ffe4e6; }
.text-pink { color: #db2777; }

.bg-orange-light { background: #ffedd5; }
.text-orange { color: #ea580c; }

.bg-purple-light { background: #f3e8ff; }
.text-purple { color: #9333ea; }

.bg-blue-light { background: #dbeafe; }
.text-blue { color: #2563eb; }

.bg-warning-light { background: #fefce8; }
.text-warning-dark { color: #ca8a04; }

.min-h-300 {
    min-height: 300px;
}

.btn-brand-light {
    background-color: #fff0eb;
    color: var(--brand);
    border: none;
}
.btn-brand-light:hover {
    background-color: var(--brand);
    color: white;
}

.fade-in {
    animation: fadeIn 0.4s ease-out;
}

@media (max-width: 1199px) {
    .stat-card {
        padding: 20px !important;
    }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Fallback if brand vars not defined globally */
:root {
    --brand-light: #fff0eb;
}

/* Off-canvas Sidebar Mobile/Tablet Styles */
@media (max-width: 1199px) {
    .mobile-sidebar {
        position: fixed;
        top: 0;
        left: -300px; /* Hidden by default */
        width: 280px;
        height: 100vh !important;
        z-index: 1050;
        transition: all 0.3s ease-in-out;
    }

    .mobile-sidebar.show {
        left: 0;
    }

    .dashboard-sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 1040;
    }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.avatar-edit-badge {
    transition: all 0.2s ease;
}
.avatar-edit-badge:hover {
    transform: scale(1.1);
    background-color: #5a1d1e !important;
}
</style>
