// src/components/Common/AddToCartButton.jsx
import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { toast } from 'sonner';

const AddToCartButton = ({ product, quantity = 1, className = '' }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        
        if (isAdding || !product) return;
        
        setIsAdding(true);
        addToCart(product, quantity);
        
        toast.success(`${product.name} added to cart!`, {
            duration: 2000
        });
        
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`bg-[#CB2957] text-black font-semibold py-2 px-4 rounded hover:bg-[#a02044] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
    );
};

export default AddToCartButton;