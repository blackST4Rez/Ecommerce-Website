import { BiShoppingBag } from "react-icons/bi"
import { useState, useEffect } from "react"
import { FadeLoader } from 'react-spinners'
import { useNavigate } from 'react-router'

const MyOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Get user from localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }

        // Get orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
        setOrders(savedOrders.reverse())
        setIsFetching(false)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

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
        <div className="min-h-screen flex flex-col">
            <div className="grow container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Left Section - User Profile */}
                    <div className="w-full md:w-1/3 lg:w-1/4 p-6">
                        <h1 className="text-2xl md:text-2xl font-bold mb-4 text-white">
                            {user?.name || 'User'}
                        </h1>
                        <p className="text-lg text-[#CB2957] mb-4">{user?.email || 'user@email.com'}</p>
                        <button 
                            onClick={handleLogout}
                            className="w-full hover:bg-black font-semibold border-2 hover:border-[#CB2957] hover:text-white py-2 px-4 bg-[#CB2957] text-black transition-all ease-in-out duration-300"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Right Section - My Orders Table */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                                My Orders
                            </h2>
                            <div className="relative">
                                {orders.length > 0 ? (
                                    <div className="space-y-3 sm:space-y-4">
                                        {orders.map((order) => (
                                            <div
                                                key={order.id || order._id}
                                                className="bg-[#0c0d0e] rounded-lg p-3 sm:p-4 md:p-6 cursor-pointer transition-colors"
                                            >
                                                {/* Mobile Layout (default) */}
                                                <div className="block lg:hidden">
                                                    <div className="flex items-start gap-3">
                                                        <img
                                                            src={order.items?.[0]?.image || order.orderItems?.[0]?.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                            alt={order.items?.[0]?.name || order.orderItems?.[0]?.name || 'Product'}
                                                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="text-xs uppercase text-[#CB2957] font-bold">Order ID</div>
                                                                    <div className="text-white text-xs sm:text-sm font-medium truncate">#{order.orderNumber}</div>
                                                                </div>
                                                                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                                                    order.status === 'Confirmed' || order.isPaid
                                                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                                                        : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                                                                }`}>
                                                                    {order.status || (order.isPaid ? 'Paid' : 'Pending')}
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-1 mt-2">
                                                                <div>
                                                                    <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Date</div>
                                                                    <div className="text-white text-xs sm:text-sm">
                                                                        {new Date(order.date || order.createdAt).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Items</div>
                                                                    <div className="text-white text-xs sm:text-sm">{order.items?.length || order.orderItems?.length || 0}</div>
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <div className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Address</div>
                                                                    <div className="text-white text-xs sm:text-sm truncate">
                                                                        {order.shippingInfo
                                                                            ? `${order.shippingInfo.address}, ${order.shippingInfo.city}`
                                                                            : order.shippingAddress
                                                                            ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                                                                            : "N/A"
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 pt-2 border-t border-gray-700">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-[10px] sm:text-xs uppercase text-[#CB2957] font-bold">Total</span>
                                                                    <span className="text-lg sm:text-xl font-bold text-white">
                                                                        Rs. {(order.total || order.totalPrice).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Tablet and Desktop Layout */}
                                                <div className="hidden lg:flex lg:items-center lg:gap-4">
                                                    {/* Left section - Image */}
                                                    <div className="shrink">
                                                        <img
                                                            src={order.items?.[0]?.image || order.orderItems?.[0]?.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                            alt={order.items?.[0]?.name || order.orderItems?.[0]?.name || 'Product'}
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                        />
                                                    </div>

                                                    {/* Middle section - Details */}
                                                    <div className="flex-1 grid grid-cols-4 gap-4">
                                                        <div>
                                                            <div className="text-xs uppercase text-[#CB2957] font-bold">Order ID</div>
                                                            <div className="text-white text-sm font-medium">#{order.orderNumber}</div>
                                                        </div>
                                                        
                                                        <div>
                                                            <div className="text-xs uppercase text-[#CB2957] font-bold">Date</div>
                                                            <div className="text-white text-sm">
                                                                {new Date(order.date || order.createdAt).toLocaleDateString()}
                                                            </div>
                                                            <div className="text-gray-400 text-xs">
                                                                {new Date(order.date || order.createdAt).toLocaleTimeString()}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="text-xs uppercase text-[#CB2957] font-bold">Address</div>
                                                            <div className="text-white text-sm">
                                                                {order.shippingInfo
                                                                    ? `${order.shippingInfo.city}`
                                                                    : order.shippingAddress
                                                                    ? `${order.shippingAddress.city}`
                                                                    : "N/A"
                                                                }
                                                            </div>
                                                            <div className="text-gray-400 text-xs">
                                                                {order.shippingInfo?.city || order.shippingAddress?.country || ''}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="text-xs uppercase text-[#CB2957] font-bold">Items</div>
                                                            <div className="text-white text-sm">{order.items?.length || order.orderItems?.length || 0} item(s)</div>
                                                        </div>
                                                    </div>

                                                    {/* Right section - Price and Status */}
                                                    <div className="flex flex-col items-end gap-2 shrink">
                                                        <div className="text-2xl font-bold text-white">
                                                            Rs. {(order.total || order.totalPrice).toLocaleString()}
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                            order.status === 'Confirmed' || order.isPaid
                                                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                                                : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                                                        }`}>
                                                            {order.status || (order.isPaid ? 'Paid' : 'Pending')}
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
                </div>
            </div>
        </div>
    )
}

export default MyOrders