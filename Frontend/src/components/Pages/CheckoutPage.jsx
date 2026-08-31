import { useNavigate } from 'react-router';
import { useCart } from '../Context/CartContext';
import { useOrders } from '../Context/OrderContext';
import { useState } from 'react';
import { formatNPR } from '../Utils/CurrencyFormat';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    });

    const totalPrice = getTotalPrice();

    {/* Redirect if cart is empty */ }
    if (cartItems.length === 0) {
        navigate(-1);
        return null;
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        {/* Validate form */ }
        if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
            alert('Please fill in all fields');
            return;
        }

        setIsProcessing(true);

        {/* Create order object with all items */ }
        const orderData = {
            items: cartItems.map(item => ({
                ...item,
                image: item.image || item.images?.[0]?.url || ''
            })),
            total: totalPrice,
            shippingInfo: formData,
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        };

        {/* Save the order using OrderContext */ }
        const savedOrder = addOrder(orderData);

        {/* Clear the cart */ }
        clearCart();

        {/* Navigate to success page with order data */ }
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/order-success', {
                state: {
                    orderNumber: savedOrder.orderNumber,
                    orderData: savedOrder
                }
            });
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-bold text-[#CB2957] mb-8 pl-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-[#1a1c1d] p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="max-h-80 overflow-y-auto space-y-3 hide-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex gap-1 md:gap-4 py-3">
                                <div className="w-30 h-30 shrink-0 rounded overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-1"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs md:text-lg font-semibold text-white truncate">{item.name}</p>
                                    <p className="text-xs md:text-lg text-white">Quantity: {item.quantity}</p>
                                    {item.brand && <p className="text-xs text-white font-light">{item.brand}</p>}
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-xs md:text-lg font-semibold text-[#CB2957]">
                                        {formatNPR(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-[#CB2957]">{formatNPR(totalPrice)}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Form */}
                <div className="bg-[#1a1c1d] p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                        <div>
                            <label className="block text-sm text-white mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="w-full bg-black text-white p-3 rounded border border-[#191b1c] focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                className="w-full bg-black text-white p-3 rounded border border-[#191b1c] focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="123 Main Street"
                                className="w-full bg-black text-white p-3 rounded border border-[#191b1c] focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-white mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Kathmandu"
                                    className="w-full bg-black text-white p-3 rounded border border-[#191b1c] focus:border-[#CB2957] outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="44600"
                                    className="w-full bg-black text-white p-3 rounded border border-[#191b1c] focus:border-[#CB2957] outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-[#CB2957] text-black font-semibold py-3 rounded-lg hover:bg-[#a02044] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></span>
                                    Processing...
                                </span>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;