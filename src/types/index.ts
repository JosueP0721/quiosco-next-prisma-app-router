import { Order, OrderProduct, Product } from "@prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price' > & {
    quantity: number
    subtotal: number
}

export type OrderWhitProducts = Order & {
    orderProducts: (OrderProduct & {
        product: Product
    })[]
}
