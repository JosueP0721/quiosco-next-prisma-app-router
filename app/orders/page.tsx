'use client'

import LaterOrdersItem from "@/components/order/LaterOrdersItem";
import Logo from "@/components/ui/Logo";
import { OrderWhitProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWhitProducts[]>(url, fetcher, {
      refreshInterval: 90000,
      revalidateOnFocus: false
    })
  
    if(isLoading) return <p className="text-xl">Cargando...</p>
  
    if(data) return (
    <>
        <h1 className=" text-center mt-20 text-6xl font-black">Ordenes Listas</h1>

        <Logo/>
        {data.length ? (
            <div className=" grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                {data.map(order => (
                    <LaterOrdersItem 
                        key={order.id} 
                        order={order} 
                    />
                ))}
            </div>
        ) : <p className="text-xl">No hay ordenes listas</p>}
    </>
  )
}
