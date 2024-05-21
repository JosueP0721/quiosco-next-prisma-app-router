'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSumary() {

    const order = useStore(state => state.order)
    const clearOrder = useStore(state => state.clearOrder)
    const total = useMemo(() => order.reduce((order, item) => order + item.subtotal, 0), [order])

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            }) 
            return
        }
        
        const response = await createOrder(data)
        if (response?.errors) {
            response.errors.forEach((error) => {
                toast.error(error.message)
            })
            return
        }

        toast.success('Pedido realizado correctamente')
        clearOrder()
    }

    return (
        <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className=" text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? <p className=" text-center my-10">El carrito está vacio</p> : (
                <>
                    <div>
                        {order.map((item) => (
                            <ProductDetails 
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                    <p className=" text-2xl mt-20 text-center">
                        Total a pagar: {''}
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>
                    <form
                        className=" w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input 
                            type="text"
                            placeholder="Tu nombre"
                            className=" bg-white border border-gray-100 p-2 w-full"
                            name="name"
                        />
                        <input 
                            type="submit" 
                            className=" py-2 rounded uppercase bg-black text-white w-full text-center font-bold cursor-pointer hover:bg-gray-900 transition duration-200"
                            value="Confirmar pedido"
                        />
                    </form>
                </>
            )}

        </aside>
    )
}
