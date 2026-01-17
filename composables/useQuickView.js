import { ref } from 'vue'

const isQuickViewOpen = ref(false)
const quickViewProduct = ref(null)

export const useQuickView = () => {
    const openQuickView = (product) => {
        quickViewProduct.value = product
        isQuickViewOpen.value = true
    }

    const closeQuickView = () => {
        isQuickViewOpen.value = false
        // Delay clearing product to avoid flicker during transition
        setTimeout(() => {
            quickViewProduct.value = null
        }, 100)
    }

    return {
        isQuickViewOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView
    }
}
