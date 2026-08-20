import { BiShoppingBag } from "react-icons/bi"
import { useState, useEffect } from "react"
import { FadeLoader } from 'react-spinners'
import { formatNPR } from '../Utils/CurrencyFormat'

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        // Simplified order data//
        const guitarOrders = [
            {
                id: 201,
                orderNumber: 3456,
                name: "SG Gibson",
                price: 148974,
                brand: "Gibson",
                material: "Mahogony",
                image: 'https://i.pinimg.com/1200x/5a/65/08/5a650813268066d7800ffe780a4af569.jpg?random=3',
                total: 148974,
                date: new Date().toISOString(),
                status: 'Confirmed',
                shippingInfo: {
                    fullName: "John Doe",
                    address: "123 Main Street",
                    city: "Kathmandu",
                    zipCode: "44600"
                }
            },
            {
                id: 202,
                orderNumber: 7890,
                name: "Fender 2001",
                price: 151296,
                brand: "Fender",
                material: "Mahogony",
                image: 'https://i.pinimg.com/1200x/e4/99/9d/e4999ddf471b0c890af9310487b35a40.jpg?random=4',
                total: 151296,
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'Pending',
                shippingInfo: {
                    fullName: "Jane Smith",
                    address: "456 Park Avenue",
                    city: "Pokhara",
                    zipCode: "33700"
                }
            }
        ]

        setOrders(guitarOrders.reverse())
        setIsFetching(false)
    }, [])

    if (isFetching) {
        return (
            <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    My Orders
                </h2>
                <div className="flex justify-center items-center min-h-75">
                    <FadeLoader color="#CB2957" />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    My Orders
                </h2>
                <div className="relative">
                    {orders.length > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-[#0c0d0e] rounded-lg p-3 sm:p-4 md:p-6 cursor-pointer transition-colors"
                                >
                                    {/* Mobile Layout */}
                                    <div className="block lg:hidden">
                                        <div className="flex items-start gap-3">
                                            <img
                                                src={order.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                alt={order.name || 'Product'}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="text-xs uppercase text-[#CB2957] font-bold">Order ID</div>
                                                        <div className="text-white text-xs sm:text-sm font-medium truncate">#{order.orderNumber}</div>
                                                    </div>
                                                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                                        order.status === 'Confirmed'
                                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                                            : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                                                    }`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-1 mt-2">
                                                    <div>
                                                        <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Date</div>
                                                        <div className="text-white text-xs sm:text-sm">
                                                            {new Date(order.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Items</div>
                                                        <div className="text-white text-xs sm:text-sm">1</div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Address</div>
                                                        <div className="text-white text-xs sm:text-sm truncate">
                                                            {order.shippingInfo?.address}, {order.shippingInfo?.city}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-gray-700">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Total</span>
                                                        <span className="text-lg sm:text-xl font-bold text-white">
                                                            {formatNPR(order.total)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tablet and Desktop Layout */}
                                    <div className="hidden lg:flex lg:items-center lg:gap-4">
                                        <div className="shrink">
                                            <img
                                                src={order.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                alt={order.name || 'Product'}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1 grid grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-xs uppercase text-[#CB2957] font-bold">Order ID</div>
                                                <div className="text-white text-sm font-medium">#{order.orderNumber}</div>
                                            </div>
                                            
                                            <div>
                                                <div className="text-xs uppercase text-[#CB2957] font-bold">Date</div>
                                                <div className="text-white text-sm">
                                                    {new Date(order.date).toLocaleDateString()}
                                                </div>
                                                <div className="text-gray-400 text-xs">
                                                    {new Date(order.date).toLocaleTimeString()}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs uppercase text-[#CB2957] font-bold">Address</div>
                                                <div className="text-white text-sm">
                                                    {order.shippingInfo?.city}
                                                </div>
                                                <div className="text-gray-400 text-xs">
                                                    {order.shippingInfo?.city || ''}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs uppercase text-[#CB2957] font-bold">Items</div>
                                                <div className="text-white text-sm">1 item(s)</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2 shrink">
                                            <div className="text-2xl font-bold text-white">
                                                {formatNPR(order.total)}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                order.status === 'Confirmed'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                                    : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                                            }`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 sm:py-16 md:py-20 px-4 text-center text-white">
                            <div className="flex flex-col items-center">
                                <BiShoppingBag size={48} className="sm:hidden mb-3 text-white" />
                                <BiShoppingBag size={60} className="hidden sm:block md:hidden mb-4 text-white" />
                                <BiShoppingBag size={72} className="hidden md:block mb-6 text-white" />
                                <span className="text-lg sm:text-xl md:text-2xl font-medium">No orders yet</span>
                                <span className="text-gray-400 text-sm sm:text-base mt-1">Start shopping to see your orders here</span>
                            </div>
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyOrders