// src/pages/Checkout.jsx
import { useNavigate } from 'react-router';
import { useCart } from '../Context/CartContext';
import { useState } from 'react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getTotalPrice } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    });
    
    const totalPrice = getTotalPrice();
    
    // Redirect if cart is empty
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

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
            alert('Please fill in all fields');
            return;
        }

        setIsProcessing(true);
        
        // Simulate order processing
        setTimeout(() => {
            setIsProcessing(false);
            // Navigate to success page
            navigate('/order-success');
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-bold text-[#CB2957] mb-8 pl-6">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-[#1a1c1d] p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="max-h-80 overflow-y-auto space-y-3">
                        {cartItems.map((item) => (
                            <div key={`${item._id}-${item.selectedColor}`} className="flex gap-4 py-3">
                                {/* Product Image */}
                                <div className="w-20 h-20 shrink bg-[#0d0e0f] rounded-lg overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-contain p-1"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                        }}
                                    />
                                </div>
                                
                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white truncate">{item.name}</p>
                                    <p className="text-sm text-white">
                                        Qty: {item.quantity}
                                        {item.selectedColor && ` | Color: ${item.selectedColor}`}
                                    </p>
                                    {item.brand && (
                                        <p className="text-xs text-white">{item.brand}</p>
                                    )}
                                </div>
                                
                                {/* Price */}
                                <div className="shrink text-right">
                                    <p className="font-semibold text-[#CB2957]">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Total */}
                    <div className="mt-4 pt-4 border-t border-white">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-[#CB2957]">Rs. {totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                {/* Checkout Form */}
                <div className="bg-[#1a1c1d] p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                            <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="John Doe" 
                                className="w-full bg-black text-white p-3 rounded border border-gray-700 focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Address *</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com" 
                                className="w-full bg-black text-white p-3 rounded border border-gray-700 focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Address *</label>
                            <input 
                                type="text" 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="123 Main Street" 
                                className="w-full bg-black text-white p-3 rounded border border-gray-700 focus:border-[#CB2957] outline-none transition-colors"
                                required
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">City *</label>
                                <input 
                                    type="text" 
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Kathmandu" 
                                    className="w-full bg-black text-white p-3 rounded border border-gray-700 focus:border-[#CB2957] outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">ZIP Code *</label>
                                <input 
                                    type="text" 
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="44600" 
                                    className="w-full bg-black text-white p-3 rounded border border-gray-700 focus:border-[#CB2957] outline-none transition-colors"
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