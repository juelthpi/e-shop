import { useState } from '#app'
import { watch, computed } from 'vue'

export const useCart = () => {
    const cart = useState('user_cart_state', () => [])
    const isCartOpen = useState('is_cart_open', () => false)

    // Sync with localStorage
    if (process.client) {
        const saved = localStorage.getItem('user_cart_data')
        if (saved && cart.value.length === 0) {
            try {
                cart.value = JSON.parse(saved)
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }

        watch(cart, (newVal) => {
            localStorage.setItem('user_cart_data', JSON.stringify(newVal))
        }, { deep: true })
    }

    const addToCart = (product, color, size, quantity) => {
        // Unique ID for cart item based on product ID + color + size
        const cartItemId = `${product.id}-${color?.id || 'default'}-${size || 'default'}`

        // Choose the best image (prefer selected color image, then product image)
        const itemImage = color?.images?.[0] || product.image || product.images?.[0]

        const index = cart.value.findIndex(item => item.cartItemId === cartItemId)

        if (index !== -1) {
            // Update quantity if already exists
            cart.value[index].quantity += quantity
        } else {
            // Add new item
            cart.value.push({
                cartItemId,
                id: product.id,
                name: product.name,
                price: product.price,
                image: itemImage,
                color: color,
                size: size,
                quantity: quantity
            })
        }
    }

    const removeFromCart = (cartItemId) => {
        cart.value = cart.value.filter(item => item.cartItemId !== cartItemId)
    }

    const updateQuantity = (cartItemId, change) => {
        const item = cart.value.find(item => item.cartItemId === cartItemId)
        if (item) {
            const newQty = item.quantity + change
            if (newQty > 0) {
                item.quantity = newQty
            }
        }
    }

    const subtotal = computed(() => {
        return cart.value.reduce((total, item) => {
            const price = parseFloat(item.price.toString().replace(/[^\d.]/g, ''))
            return total + (price * item.quantity)
        }, 0)
    })

    const cartCount = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0)
    })

    const toggleCartDrawer = () => {
        isCartOpen.value = !isCartOpen.value
    }

    return {
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        cartCount,
        toggleCartDrawer
    }
}
