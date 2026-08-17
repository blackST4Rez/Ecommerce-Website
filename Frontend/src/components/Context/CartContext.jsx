// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Load cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, quantity = 1, selectedColor = null) => {
        setCartItems(prevItems => {
            // Check if product already exists
            const existingItem = prevItems.find(
                item => item._id === product._id && item.selectedColor === selectedColor
            );

            if (existingItem) {
                // Update quantity
                return prevItems.map(item =>
                    item._id === product._id && item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                const newItem = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.images?.[0]?.url || product.image,
                    selectedColor: selectedColor || product.color || null,
                    brand: product.brand || null,
                    material: product.material || null,
                };
                return [...prevItems, newItem];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId, selectedColor = null) => {
        setCartItems(prevItems => 
            prevItems.filter(item => 
                !(item._id === productId && item.selectedColor === selectedColor)
            )
        );
    };

    // Update quantity
    const updateQuantity = (productId, newQuantity, selectedColor = null) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, selectedColor);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId && item.selectedColor === selectedColor
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Get total items count
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Get total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const value = {
        cartItems,
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