import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/Context/AuthContext';
import { CartProvider } from './components/Context/CartContext';
import { OrderProvider } from './components/Context/OrderContext';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import UserLayout from './components/Layout/UserLayout';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import MyOrders from './components/Pages/MyOrders';
import CollectionPage from './components/Pages/CollectionPage';
import AMPCollectionPage from './components/Pages/AMPCollectionPage';
import ProductDetailsPage from './components/Pages/ProductDetailsPage';
import CheckoutPage from './components/Pages/CheckoutPage';
import OrderSuccessPage from './components/Pages/OrderSuccessPage';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <OrderProvider>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            gutter={8}
                            toastOptions={{

                                duration: 3000,
                                style: {
                                    background: '#1E1E1E',
                                    color: '#CB2957',
                                    padding: '16px 20px',
                                    borderRadius: '8px',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                },

                                success: {
                                    duration: 3000,
                                    iconTheme: {
                                        primary: '#1ee38a',
                                        secondary: '#000000',
                                    },
                                },

                                error: {
                                    duration: 3000,
                                    iconTheme: {
                                        primary: '#FF4444',
                                        secondary: '#000000',
                                    },
                                },

                                loading: {
                                    duration: 3000,
                                    iconTheme: {
                                        primary: '#FFA500',
                                        secondary: '#000000',
                                    },
                                },
                            }}
                        />
                        
                        <Routes>
                            <Route path='/' element={<UserLayout />}>
                                {/* Public Routes */}
                                <Route index element={<Home />} />
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                                <Route path='collections/guitars' element={<CollectionPage />} />
                                <Route path='collections/amp' element={<AMPCollectionPage />} />
                                <Route path='collections/:collection' element={<CollectionPage />} />
                                <Route path='product/:productId' element={<ProductDetailsPage />} />
                                
                                {/* Protected Routes */}
                                <Route path='profile' element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } />
                                <Route path='my-orders' element={
                                    <ProtectedRoute>
                                        <MyOrders />
                                    </ProtectedRoute>
                                } />
                                <Route path="/checkout" element={
                                    <ProtectedRoute>
                                        <CheckoutPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/order-success" element={
                                    <ProtectedRoute>
                                        <OrderSuccessPage />
                                    </ProtectedRoute>
                                } />
                            </Route>
                        </Routes>
                    </OrderProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;