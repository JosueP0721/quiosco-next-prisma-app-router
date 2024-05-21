import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    MAX_ITEMS: number,
    MIN_ITEMS: number,
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    MAX_ITEMS: 5,
    MIN_ITEMS: 1,
    addToOrder: (product) => {

        const max = get().MAX_ITEMS
        const {categoryId, image, ...data} = product
        let order : OrderItem[] = []

        if(get().order.find((item) => item.id === product.id)){
            order = get().order.map((item) => item.id === product.id ? {
                ...item,
                quantity: item.quantity === max  ? item.quantity : item.quantity + 1,
                subtotal: item.quantity === max ? item.quantity * product.price : (item.quantity + 1) * product.price
            } : item)
        } else {
            order = [ ...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        const order = get().order.map((item) => item.id === id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price
        } : item)

        set(() => ({
            order
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map((item) => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price
        } : item)

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        const order = get().order.filter((item) => item.id !== id)

        set(() => ({
            order
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}));