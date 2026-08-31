import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { BiCheckCircle } from 'react-icons/bi';
import { useCart } from '../Context/CartContext';

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();
    const [orderNumber, setOrderNumber] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        // Get order data from navigation state
        const num = location.state?.orderNumber || Math.floor(Math.random() * 4000) + 1000;
        const data = location.state?.orderData || null;
        
        setOrderNumber(num);
        setOrderData(data);
        
        if (!isCleared) {
            clearCart();
            setIsCleared(true);
        }
    }, [location.state, clearCart, isCleared]);

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-[#191b1c] flex items-center justify-center px-4">
            <div className="bg-[#1b1b1b] rounded-lg p-8 md:p-12 max-w-2xl w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-[#CB2957] rounded-full flex items-center justify-center">
                        <BiCheckCircle size={48} className="text-black" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Order Placed Successfully
                </h1>

                <p className="text-gray-400 text-lg mb-2">
                    Thank you for your purchase
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    Your order has been confirmed and will be shipped soon.
                </p>

                <div className="bg-[#0d0e0f] rounded-lg p-4 mb-8 text-left">
                    <p className="text-gray-400 text-sm mb-2">Order Details</p>
                    <div className="border-t border-gray-700 pt-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order Number:</span>
                            <span className="text-white">#{orderNumber}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-500">Date:</span>
                            <span className="text-white">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-500">Status:</span>
                            <span className="text-green-400">Confirmed</span>
                        </div>
                        {orderData && (
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Items:</span>
                                <span className="text-white">{orderData.items?.length || 0}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleContinueShopping}
                        className="flex-1 bg-[#CB2957] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#a02044] transition-all duration-300"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={handleViewOrders}
                        className="flex-1 bg-[#0d0e0f] text-[#CB2957] font-semibold py-3 px-6 rounded-lg hover:bg-[#CB2957] hover:text-black transition-all duration-300"
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;