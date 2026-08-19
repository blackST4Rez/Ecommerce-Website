import { BiTrash } from "react-icons/bi";
import { useCart } from '../Context/CartContext';

const CartContent = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const handleDeleteCartItem = (productId) => {
        removeFromCart(productId);
    };

    const handleIncrement = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecrement = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity - 1);
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                <p className="text-xl">Your cart is empty</p>
                <p className="text-sm mt-2">Start shopping to add items!</p>
            </div>
        );
    }

    return (
        <div className="text-white">
            {cartItems.map((product) => (
                <div key={product._id}
                    className="flex items-start justify-between py-4 border-b border-gray-700"
                >
                    <div className="flex gap-3 items-start flex-1 min-w-0">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-20 h-20 sm:w-16 sm:h-16 md:w-25 md:h-25 object-cover rounded shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-sm sm:text-base md:text-lg font-medium truncate">
                                {product.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">
                                {product.brand && `Brand: ${product.brand} | `}
                                {product.material && `Material: ${product.material}`}
                            </p>
                            <div className="flex items-center mt-2">
                                <button 
                                    onClick={() => handleDecrement(product._id, product.quantity)}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-[#CB2957] border-l border-t border-b border-[#CB2957] hover:text-white text-sm sm:text-base"
                                >
                                    -
                                </button>
                                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-white min-w-6 sm:min-w-7.5 text-center text-sm sm:text-base">
                                    {product.quantity}
                                </span>
                                <button 
                                    onClick={() => handleIncrement(product._id, product.quantity)}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-[#CB2957] border-r border-t border-b border-[#CB2957] hover:text-white text-sm sm:text-base"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative shrink-0 ml-2 flex flex-col">
                        <p className="text-white text-l sm:text-base md:text-lg">
                            Rs. <span className="font-bold">{(product.price * product.quantity).toLocaleString()}</span>
                        </p>
                        <button 
                            onClick={() => handleDeleteCartItem(product._id)}
                            className="absolute top-12 right-2 sm:top-17"
                        >
                            <BiTrash size={18} className="sm:w-5 sm:h-5 text-red-600 hover:text-red-400 transition-colors" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContent;