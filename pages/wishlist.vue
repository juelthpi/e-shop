<template>
    <div class="page-container mb-5">
        <div class="container">
            <div class="mt-4 d-flex justify-content-between align-items-center">
                <div class="mb-4">
                    <AppBreadcrumb :items="breadcrumbItems" />
                    <template v-if="!isMounted">
                        <Skeleton height="24px" width="200px" class="mb-2" />
                        <Skeleton height="16px" width="120px" />
                    </template>
                    <template v-else>
                        <h5>My Wishlist</h5>
                        <p>{{ globalWishlist?.length || 0 }} Products Found</p>
                    </template>
                </div>
            </div>

            <div class="grid-container-1">
                <template v-if="!isMounted">
                    <ProductSkeleton v-for="n in 5" :key="n" />
                </template>
                <template v-else>
                    <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
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

            <!-- Empty State -->
            <div v-if="isMounted && (!globalWishlist || globalWishlist.length === 0)" class="text-center py-5">
                <i class="fa-regular fa-heart fa-4x text-muted mb-3"></i>
                <h5>Your wishlist is empty</h5>
                <p>Add some products to your wishlist to see them here.</p>
                <NuxtLink to="/category" class="primary-btn justify-content-center w-auto px-4 mt-3 d-inline-block">Go Shopping</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const { wishlist: globalWishlist } = useWishlist()
const isMounted = ref(false)
const isLoadingMore = ref(false)
const displayLimit = ref(10) // Initial items to show

const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Wishlist', link: '' }
]

const displayedProducts = computed(() => {
    if (!globalWishlist.value) return []
    return globalWishlist.value.slice(0, displayLimit.value)
})

const hasMore = computed(() => {
    if (!globalWishlist.value) return false
    return displayLimit.value < globalWishlist.value.length
})

const loadMore = () => {
    if (isLoadingMore.value) return
    isLoadingMore.value = true
    
    // Simulate delay
    setTimeout(() => {
        displayLimit.value += 10
        isLoadingMore.value = false
    }, 800)
}

onMounted(() => {
    isMounted.value = true
})
</script>

<style scoped>
 
</style>