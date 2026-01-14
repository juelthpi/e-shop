import { useState } from '#app'
import { watch } from 'vue'

export const useUser = () => {
    // Persistent user state
    const user = useState('user_state', () => null)
    const orders = useState('user_orders', () => [])

    // Sync with localStorage
    if (process.client) {
        const savedUser = localStorage.getItem('user_profile_data')
        const savedOrders = localStorage.getItem('user_orders_data')

        if (savedUser && !user.value) {
            try {
                user.value = JSON.parse(savedUser)
            } catch (e) {
                console.error('Failed to parse user data', e)
            }
        }

        if (savedOrders && orders.value.length === 0) {
            try {
                orders.value = JSON.parse(savedOrders)
            } catch (e) {
                console.error('Failed to parse orders data', e)
            }
        }

        watch(user, (newVal) => {
            if (newVal) localStorage.setItem('user_profile_data', JSON.stringify(newVal))
            else localStorage.removeItem('user_profile_data')
        }, { deep: true })

        watch(orders, (newVal) => {
            localStorage.setItem('user_orders_data', JSON.stringify(newVal))
        }, { deep: true })
    }

    const loginOrUpdateUser = (userData) => {
        user.value = {
            ...user.value,
            ...userData,
            avatar: userData.avatar || user.value?.avatar || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
            walletBalance: userData.walletBalance ?? user.value?.walletBalance ?? 0
        }
    }

    const updateProfile = (profileData) => {
        user.value = {
            ...user.value,
            ...profileData
        }
    }

    const addOrder = (order) => {
        orders.value.unshift(order)
    }

    const logout = () => {
        user.value = null
    }

    return {
        user,
        orders,
        loginOrUpdateUser,
        updateProfile,
        addOrder,
        logout
    }
}
