import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';

const AddToCartButton = ({ product, quantity = 1, className = '' }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Check if user is logged in
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart.', {
            });
            return;
        }

        if (isAdding || !product || !product._id) {
            toast.error('Cannot add this item', {
            });
            return;
        }

        setIsAdding(true);

        try {
            addToCart(product, quantity);
            toast.success(`${product.name} added to cart!`, {
            });

        } catch (error) {
            console.log(error);
            toast.error('Failed to add item', {
            });
        }

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full mt-3 bg-[#0d0e0f] text-[#CB2957] hover:bg-[#CB2957] hover:text-black font-semibold py-2.5 px-4 rounded text-lg cursor-pointer transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
                    Adding...
                </span>
            ) : (
                'Add to Cart'
            )}
        </button>
    );
};

export default AddToCartButton;