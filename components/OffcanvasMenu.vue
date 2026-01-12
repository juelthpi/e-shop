<template>
  <div class="offcanvas offcanvas-start p-3" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header shadow-1">
      <h5 class="text-brand">Categories</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="accordion d-flex flex-column gap-3" id="accordionExample">
        <div class="menu-item shadow-1">
          <h5 id="headingOne" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            For You
          </h5>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="menu-sub-item">
              <ul class="d-flex flex-column gap-1">
                <li><nuxt-link to="#">Baby Bath</nuxt-link></li>
                <li><nuxt-link to="#">Baby Accessories</nuxt-link></li>
                <li>
                  <div class="accordion d-flex flex-column gap-3 ms-2" id="accordionExample2">
                  <div class="menu-item shadow-1">
                    <h5 id="subheadingOne" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#subcollapseOne" aria-expanded="false" aria-controls="subcollapseOne">
                      Sub Item
                    </h5>
                    <div id="subcollapseOne" class="accordion-collapse collapse" aria-labelledby="subheadingOne" data-bs-parent="#accordionExample2">
                      <div class="menu-sub-item">
                        <ul class="d-flex flex-column gap-1">
                          <li><nuxt-link to="#">Child Item</nuxt-link></li>
                          <li><nuxt-link to="#">Child Item 2</nuxt-link></li>
                          <li><nuxt-link to="#">Child Item 3</nuxt-link></li>
                          
                        </ul>
                      </div>
                    </div>
                  </div>
         
                 </div>
                </li>
                <li><nuxt-link to="#">Baby Clothing Set</nuxt-link></li>
                <li><nuxt-link to="#">Baby Cream</nuxt-link></li>
                
                <li><nuxt-link to="#">Baby Diapers</nuxt-link></li>
                <li><nuxt-link to="#">Baby Lotion</nuxt-link></li>
                <li><nuxt-link to="#">Baby Oil</nuxt-link></li>
                <li><nuxt-link to="#">Baby Powder</nuxt-link></li>
                <li><nuxt-link to="#">Baby Shoes</nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="menu-item shadow-1">
          <h5 class="accordion-button collapsed" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Men
          </h5>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="menu-sub-item">
              <ul class="d-flex flex-column gap-1">
                <li><nuxt-link to="#">Men Bags</nuxt-link></li>
                <li><nuxt-link to="#">Man Belts</nuxt-link></li>
                <li><nuxt-link to="#">Man Caps & Hats</nuxt-link></li>
                <li><nuxt-link to="#">Man Jewellery</nuxt-link></li>
                <li><nuxt-link to="#">Man Wallet</nuxt-link></li>
                <li><nuxt-link to="#">Man Watch</nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Bootstrap offcanvas logic relies on data-bs attributes which work if bootstrap JS is loaded globally.
// We added bootstrap bundle in nuxt.config.ts head scripts, so it should work.
</script>
