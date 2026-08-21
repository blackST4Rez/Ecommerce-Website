import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    // Load orders from localStorage on mount
    useEffect(() => {
        try {
            const savedOrders = localStorage.getItem('orders');
            if (savedOrders) {
                const parsed = JSON.parse(savedOrders);
                if (Array.isArray(parsed)) {
                    setOrders(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }, []);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving orders:', error);
        }
    }, [orders]);

    // Add a new order
    const addOrder = (orderData) => {
        const newOrder = {
            ...orderData,
            id: Date.now(),
            orderNumber: Math.floor(Math.random() * 9000) + 1000,
            date: new Date().toISOString(),
            status: 'Confirmed'
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]); // Newest first
        return newOrder;
    };

    // Get all orders
    const getOrders = () => {
        return orders;
    };

    // Get order by ID
    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    // Clear all orders
    const clearOrders = () => {
        setOrders([]);
    };

    const value = {
        orders,
        addOrder,
        getOrders,
        getOrderById,
        clearOrders
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
}