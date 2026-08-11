import { useEffect, useState } from "react"

const MyOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setTimeout(() => { 
            const mockOrders = [
                {
                    _id: '12345',
                    createdAt: new Date(),
                    shippingAddress: { city: 'New York', country: 'USA' },
                    orderItems: [
                        {
                            name: "Stratocastor",
                            image: "https://i.pinimg.com/1200x/fc/66/29/fc6629453180eb4ad315e3485a3cca1f.jpg?random=1",
                        },
                    ],
                    totalPrice: 200,
                    isPaid: true,
                },
                {
                    _id: '93459',
                    createdAt: new Date(),
                    shippingAddress: { city: 'Kathmandu', country: 'Nepal' },
                    orderItems: [
                        {
                            name: "Telecastor",
                            image: "https://i.pinimg.com/1200x/63/4c/59/634c59daebee92d09c0151d11c53210f.jpg?random=2",
                        },
                    ],
                    totalPrice: 500,
                    isPaid: false,
                },
            ]
            setOrders(mockOrders)
        }, 1000)  
    }, []) 

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-3xl sm:text-2xl font-bold mb-6 text-white">
                My Orders
            </h2>
            <div className="relative overflow-x-auto">
                <table className="min-w-full text-left text-white">
                    <thead className="text-l uppercase text-[#CB2957]">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order ID</th>
                            <th className="py-2 px-4 sm:py-3">Created</th>
                            <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3">Items</th>
                            <th className="py-2 px-4 sm:py-3">Price</th>
                            <th className="py-2 px-4 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="cursor-pointer border-b border-gray-400"
                                >
                                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order.orderItems[0].name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-sm">
                                        {order._id}
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4 text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()} <br />
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4 text-sm">
                                        {order.shippingAddress
                                            ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                                            : "N/A"
                                        }
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4 text-center">
                                        {order.orderItems.length}
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                                        <span className={`px-3 py-1 rounded-full text-l font-semibold ${
                                            order.isPaid 
                                                ? 'bg-[#0c0d0e] text-emerald-500' 
                                                : 'bg-[#0c0d0e] text-yellow-300'
                                        }`}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-8 px-4 text-center text-gray-700">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span>You have no orders</span>
                                    </div>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders