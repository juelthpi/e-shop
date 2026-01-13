import { useState } from '#app'
import { watch } from 'vue'

export const useWishlist = () => {
    // Use a unique key for Nuxt useState
    const wishlist = useState('user_wishlist_state', () => [])

    // Sync with localStorage on client side
    if (process.client) {
        // Initial load from localStorage
        const saved = localStorage.getItem('user_wishlist_data')
        if (saved && wishlist.value.length === 0) {
            try {
                wishlist.value = JSON.parse(saved)
            } catch (e) {
                console.error('Failed to parse wishlist', e)
            }
        }

        // Watch for changes and save to localStorage
        watch(wishlist, (newVal) => {
            localStorage.setItem('user_wishlist_data', JSON.stringify(newVal))
        }, { deep: true })
    }

    const isInWishlist = (productId) => {
        return wishlist.value.some(p => p.id === productId)
    }

    const toggleWishlist = (product) => {
        if (!product || !product.id) return

        const index = wishlist.value.findIndex(p => p.id === product.id)
        if (index === -1) {
            // Add a clean copy of the product object
            wishlist.value.push({ ...product })
        } else {
            wishlist.value.splice(index, 1)
        }
    }

    const removeFromWishlist = (productId) => {
        const index = wishlist.value.findIndex(p => p.id === productId)
        if (index !== -1) {
            wishlist.value.splice(index, 1)
        }
    }

    return {
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist
    }
}
