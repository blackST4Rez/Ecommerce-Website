import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth(); 

    // Load orders for the specific user
    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        try {
            const savedOrders = localStorage.getItem(`orders_${user.id}`);
            if (savedOrders) {
                const parsed = JSON.parse(savedOrders);
                if (Array.isArray(parsed)) {
                    setOrders(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }, [user]);

    // Save orders for the specific user
    useEffect(() => {
        if (!user) return;
        
        try {
            localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving orders:', error);
        }
    }, [orders, user]);

    // Add a new order
    const addOrder = (orderData) => {
        if (!user) {
            console.error('No user logged in');
            return null;
        }

        const newOrder = {
            ...orderData,
            id: Date.now(),
            orderNumber: Math.floor(Math.random() * 9000) + 1000,
            date: new Date().toISOString(),
            status: 'Confirmed',
            userId: user.id,
            userEmail: user.email // 
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

    // Clear all orders for the current user
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