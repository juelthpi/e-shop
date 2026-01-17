<template>
    <div class="page-container mb-5">
        <div class="container">
            <div class="category-header mt-4 d-flex justify-content-between align-items-center">
                <div>
                    <AppBreadcrumb :items="breadcrumbItems" />
                    <template v-if="!isMounted">
                        <Skeleton height="24px" width="200px" class="mb-2" />
                        <Skeleton height="16px" width="120px" />
                    </template>
                    <template v-else>
                        <h5>Explore All Products</h5>
                        <p>300+ Products Found</p>
                    </template>
                </div>
                <!-- Mobile Filter Button -->
                <button class="filter-mobile-btn d-lg-none" @click="isMobileFilterOpen = true">
                    <i class="fa-solid fa-filter"></i>
                    <span>Filter</span>
                </button>
            </div>

            <div class="d-flex gap-3 mt-4 align-items-start position-relative">
                <!-- Desktop Sidebar -->
                <div class="category-sidebar-wrapper d-none d-lg-block">
                    <div class="category-sidebar border-1 p-3 rounded-3 bg-white shadow-1">
                        <CategorySidebar />
                    </div>
                </div>

                <!-- Mobile Off-canvas Sidebar -->
                <Transition name="fade">
                    <div v-if="isMobileFilterOpen" class="mobile-filter-overlay" @click="isMobileFilterOpen = false"></div>
                </Transition>
                
                <Transition name="slide">
                    <div v-if="isMobileFilterOpen" class="mobile-filter-drawer">
                        <div class="drawer-header border-bottom p-3 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Filters</h6>
                            <button @click="isMobileFilterOpen = false" class="close-btn">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="drawer-body p-3">
                            <CategorySidebar />
                        </div>
                    </div>
                </Transition>

                <div class="category-content">
                    <div class="grid-container-1">
                        <template v-if="!isMounted">
                            <ProductSkeleton v-for="n in 10" :key="n" />
                        </template>
                        <template v-else>
                            <ProductCard v-for="product in products" :key="product.id" :product="product" />
                        </template>
                    </div>
                    <!-- load more button -->
                    <div class="d-flex justify-content-center mt-5" v-if="isMounted && hasMore">
                        <button class="primary-btn w-auto px-5" @click="loadMore" :disabled="isLoadingMore">
                            <template v-if="isLoadingMore">
                                Loading... <i class="fa-solid fa-spinner fa-spin ms-2"></i>
                            </template>
                            <template v-else>
                                Load More <i class="fa-solid fa-angle-down ms-2"></i>
                            </template>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, computed } from 'vue'
    const { generateProducts } = useProducts();
    
    const products = ref(generateProducts(15));
    const TOTAL_PRODUCTS = 40; // Simulated total products for demo
    
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Category', link: '/category' }
    ];
    
    const isMobileFilterOpen = ref(false);
    const isMounted = ref(false);
    const isLoadingMore = ref(false);

    const hasMore = computed(() => {
        return products.value.length < TOTAL_PRODUCTS;
    });

    const loadMore = () => {
        if (isLoadingMore.value) return;
        isLoadingMore.value = true;
        
        // Simulate API delay
        setTimeout(() => {
            const newProducts = generateProducts(10);
            products.value.push(...newProducts);
            isLoadingMore.value = false;
        }, 1000);
    };

    onMounted(() => {
        isMounted.value = true;
    });

    // Watch for mobile filter open state to disable body scroll
    if (process.client) {
        watch(isMobileFilterOpen, (val) => {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = ''
            }
        })
    }
</script>

<style scoped>
    .category-sidebar-wrapper {
        width: 280px;
        flex-shrink: 0;
        position: sticky;
        top: 80px;
        max-height: calc(100vh - 100px);
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 5px;
    }

    /* Custom Scrollbar */
    .category-sidebar-wrapper::-webkit-scrollbar {
        width: 4px;
    }
    .category-sidebar-wrapper::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .category-sidebar-wrapper::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }
    .category-sidebar-wrapper::-webkit-scrollbar-thumb:hover {
        background: #aaa;
    }
    .category-content {
        flex-grow: 1;
    }

    /* Mobile Filter Button Styling */
    .filter-mobile-btn {
        display: flex;
        align-items: center;
        gap:5px;
        padding: 5px 14px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-weight:500;
        color: var(--black);
        transition: all 0.3s ease;
    }
    .filter-mobile-btn:hover {
        border-color: var(--brand);
        color: var(--brand);
    }

    /* Off-canvas Drawer Styles */
    .mobile-filter-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .mobile-filter-drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        height: 100%;
        background: #fff;
        z-index: 1001;
        overflow-y: auto;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .close-btn {
        font-size: 20px;
        color: #666;
    }

    /* Animations */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

    .slide-enter-active, .slide-leave-active {
        transition: transform 0.4s ease;
    }
    .slide-enter-from, .slide-leave-to {
        transform: translateX(-100%);
    }

    @media (max-width: 991px) {
        .category-content {
            width: 100%;
        }
    
    }
</style>