import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Load cart from localStorage with error handling
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, quantity = 1, selectedColor = null) => {
        if (!product || !product._id) {
            console.error('Invalid product:', product);
            return;
        }

        setCartItems(prevItems => {
            // Ensure we're working with a proper array
            const currentItems = Array.isArray(prevItems) ? prevItems : [];
            
            // Create a unique identifier for the product variant
            const variantId = `${product._id}-${selectedColor || 'default'}`;
            
            // Check if product already exists
            const existingItem = currentItems.find(
                item => `${item._id}-${item.selectedColor || 'default'}` === variantId
            );

            if (existingItem) {
                // Update quantity
                return currentItems.map(item =>
                    `${item._id}-${item.selectedColor || 'default'}` === variantId
                        ? { ...item, quantity: (item.quantity || 0) + quantity }
                        : item
                );
            } else {
                // Add new item
                const newItem = {
                    _id: product._id,
                    name: product.name || 'Product',
                    price: product.price || 0,
                    quantity: quantity || 1,
                    image: product.images?.[0]?.url || product.image || '',
                    selectedColor: selectedColor || null,
                    brand: product.brand || null,
                    material: product.material || null,
                };
                return [...currentItems, newItem];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId, selectedColor = null) => {
        if (!productId) return;

        setCartItems(prevItems => {
            const currentItems = Array.isArray(prevItems) ? prevItems : [];
            return currentItems.filter(item => {
                const variantId = `${item._id}-${item.selectedColor || 'default'}`;
                const targetVariantId = `${productId}-${selectedColor || 'default'}`;
                return variantId !== targetVariantId;
            });
        });
    };

    // Update quantity
    const updateQuantity = (productId, newQuantity, selectedColor = null) => {
        if (!productId) return;

        if (newQuantity <= 0) {
            removeFromCart(productId, selectedColor);
            return;
        }

        setCartItems(prevItems => {
            const currentItems = Array.isArray(prevItems) ? prevItems : [];
            return currentItems.map(item => {
                const variantId = `${item._id}-${item.selectedColor || 'default'}`;
                const targetVariantId = `${productId}-${selectedColor || 'default'}`;
                if (variantId === targetVariantId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Get total items count
    const getTotalItems = () => {
        return Array.isArray(cartItems) 
            ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0) 
            : 0;
    };

    // Get total price
    const getTotalPrice = () => {
        return Array.isArray(cartItems)
            ? cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0)
            : 0;
    };

    const value = {
        cartItems: Array.isArray(cartItems) ? cartItems : [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for using cart
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}