import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    {/* Load cart from localStorage on mount */ }
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    setCartItems(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, []);

    {/* Save cart to localStorage whenever it changes */ }
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }, [cartItems]);

    {/* Add item to cart */ }
    const addToCart = (product, quantity = 1) => {
        if (!product || !product._id) {
            console.error('Invalid product');
            return;
        }

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => String(item._id) === String(product._id));

            if (existingItem) {
                return prevItems.map(item =>
                    String(item._id) === String(product._id)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                const newItem = {
                    _id: product._id,
                    name: product.name || 'Product',
                    price: product.price || 0,
                    quantity: quantity || 1,
                    image: product.images?.[0]?.url || product.image || '',
                    brand: product.brand || null,
                    material: product.material || null,
                };
                return [...prevItems, newItem];
            }
        });
    };

    {/* Remove item from cart */ }
    const removeFromCart = (productId) => {
        if (!productId) return;
        setCartItems(prevItems =>
            prevItems.filter(item => String(item._id) !== String(productId))
        );
    };

    {/* Update the quantity */ }
    const updateQuantity = (productId, newQuantity) => {
        if (!productId) return;

        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                String(item._id) === String(productId)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };


    {/* Clear cart */ }
    const clearCart = () => {
        setCartItems([]);
    };

    {/* Get total items */ }
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    {/* Get total price */ }
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

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}