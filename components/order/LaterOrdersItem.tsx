import { OrderWhitProducts } from "@/src/types"

type LaterOrdersItemProps = {
    order: OrderWhitProducts
}

export default function LaterOrdersItem({order} : LaterOrdersItemProps) {
  return (
    <div className=" bg-white shadow p-5 space-y-5 rounded-lg">
        <p className="font-bold text-2xl text-slate-600">
            Cliente: {order.name}
        </p>
        <ul
            className=" divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            role="list"
        >
            {order.orderProducts.map(orderProduct => (
                <li
                    key={orderProduct.id}
                    className="flex py-6 text-lg"
                >
                    <p>
                        <span className=" font-bold">
                            ({orderProduct.quantity}) {''}
                        </span>
                        {orderProduct.product.name}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}
