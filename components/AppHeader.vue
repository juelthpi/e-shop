<template>
  <header class="header-area bg-brand py-4 px-md-3 position-sticky top-0 z-999">
    <div class="container-fluid">
      <div class="header d-flex align-items-center justify-content-between gap-3">
        <!-- logo -->
        <div class="logo d-flex align-items-center gap-md-4 gap-2">
          <span data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <i class="fa-solid fa-bars"></i>
          </span>
          <nuxt-link to="/">
            <img src="/assets/images/logo.png" alt="logo">
          </nuxt-link>
          <div class="d-flex align-items-center gap-3 header-location-show">
            <i class="fa-solid fa-location-crosshairs"></i>
            <div>
              <span class="text-white-50">Deliver To</span>
              <p>Bangladesh</p>
            </div>
          </div>
        </div>
        <!-- search -->
        <div class="header-search-wrapper header-top-search" ref="headerSearch">
          <div class="search-box d-flex align-items-center gap-2">
            <div>
              <select class="auto-width-select" ref="selectRef" @change="autoResizeSelect">
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <input type="text" placeholder="Search products...">
            <button>Search</button>
          </div>
        </div>
        <!-- header right -->
        <div class="d-flex align-items-center gap-4">
          <div class="d-none d-md-flex align-items-center gap-5 header-right">
            <nuxt-link to="/wishlist" class="position-relative d-flex flex-column align-items-center text-white text-decoration-none">
              <i class="fa-solid fa-heart mb-1"></i>
              <span>Wishlist</span>
              <span v-if="wishlist.length > 0" class="badge-count">{{ wishlist.length > 9 ? '9+' : wishlist.length }}</span>
            </nuxt-link>
            <div class="position-relative cursor-pointer d-flex flex-column align-items-center text-white" @click="toggleCartDrawer">
              <i class="fa-solid fa-cart-shopping mb-1"></i>
              <span>Cart</span>
              <span v-if="cartCount > 0" class="badge-count">{{ cartCount > 9 ? '9+' : cartCount }}</span>
            </div>
            <div class="dropdown profile-dropdown">
              <button
                class="btn profile-btn dropdown-toggle d-flex flex-column align-items-center text-white border-0 p-0"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div v-if="user" class="header-avatar-circle">
                   <img :src="user.avatar" alt="UB" class="w-100 h-100 rounded-circle object-fit-cover">
                </div>
                <template v-else>
                   <i class="fa-regular fa-user mb-1"></i>
                   <span>Profile</span>
                </template>
              </button>

              <ul class="dropdown-menu dropdown-menu-end profile-menu shadow-lg border-0 rounded-4  p-2" aria-labelledby="profileDropdown">
                <template v-if="!user">
                    <li>
                      <nuxt-link class="dropdown-item rounded-3 mb-1" to="/login">
                        <i class="fa-solid fa-right-to-bracket me-2 text-muted"></i>
                        Login
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link class="dropdown-item rounded-3" to="/signup">
                        <i class="fa-solid fa-user-plus me-2 text-muted"></i>
                        Sign Up
                      </nuxt-link>
                    </li>
                </template>
                <template v-else>
                     <li>
                      <nuxt-link class="dropdown-item rounded-3 mb-1" to="/user-dashboard">
                        <i class="fa-solid fa-border-all me-2 text-muted"></i>
                        Dashboard
                      </nuxt-link>
                    </li>
                    <li>
                      <button class="dropdown-item rounded-3 text-danger" @click="handleLogout">
                        <i class="fa-solid fa-right-from-bracket me-2"></i>
                        Logout
                      </button>
                    </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="dropdown country-dropdown">
            <button class="country-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/assets/images/flags/flag3.png" alt="">
              <span class="country-name">US</span>
              <i class="fa-solid fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu country-menu mt-4">
              <li>
                <a class="dropdown-item active" href="#" data-flag="us.png" data-name="English (US)">
                  <img src="/assets/images/flags/flag3.png" alt="">
                  US
                  <i class="fa-solid fa-circle-check"></i>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-flag="flag.png" data-name="France">
                  <img src="/assets/images/flags/flag3.png" alt="">
                  France
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-flag="bangladesh.png" data-name="Bangla">
                  <img src="/assets/images/flags/flag3.png" alt="">
                  Bangla
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" data-flag="arabic.png" data-name="Arabic">
                  <img src="/assets/images/flags/flag3.png" alt="">
                  Arabic
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const { wishlist } = useWishlist();
const { cartCount, toggleCartDrawer } = useCart();
const { user, logout } = useUser();

const headerSearch = ref(null);
const selectRef = ref(null);

const handleScroll = () => {
  if (window.scrollY >= 540) {
    headerSearch.value?.classList.add("show");
  } else {
    headerSearch.value?.classList.remove("show");
  }
};

const autoResizeSelect = () => {
  const select = selectRef.value;
  if (!select) return;
  
  const tempSpan = document.createElement("span");
  tempSpan.style.visibility = "hidden";
  tempSpan.style.whiteSpace = "nowrap";
  tempSpan.style.font = window.getComputedStyle(select).font;
  tempSpan.innerText = select.options[select.selectedIndex].text;

  document.body.appendChild(tempSpan);
  select.style.width = tempSpan.offsetWidth + 25 + "px";
  document.body.removeChild(tempSpan);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  autoResizeSelect(); // Initial resize
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleLogout = () => {
  logout();
  navigateTo('/');
};
</script>

<style scoped>
.badge-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--yellow) !important;
  color: var(--black) !important;
  font-size: 8px;
  font-weight: 400;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid var(--brand);
  line-height: 1;
 
  z-index: 10;
}

.cursor-pointer {
  cursor: pointer;
}

.header-right i {
    font-size: 20px;
}

.header-right span {
    font-size: 14px;
}

.profile-btn:focus, .profile-btn:active {
    box-shadow: none !important;
    outline: none !important;
}

.header-avatar-circle {
    width: 35px;
    height: 35px;
    border: 2px solid rgba(255,255,255,0.8);
    border-radius: 50%;
    overflow: hidden;
}
</style>
