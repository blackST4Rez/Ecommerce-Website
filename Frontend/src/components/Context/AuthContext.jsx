
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const mockUser = {
                id: 'user_123',
                firstName: 'Raka',
                lastName: 'Maharjan',
                email: email,
                avatar: null,
                createdAt: new Date().toISOString()
            };

            const mockToken = 'mock_jwt_token_xyz_123';

            // Save to localStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            setUser(mockUser);
            setIsAuthenticated(true);
            
            toast.success(`Welcome back, ${mockUser.firstName}!`, {
            });
            
            return { success: true, user: mockUser };
        } catch (error) {

            toast.error(error.message || 'Login failed. Please try again.', {
            });
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists (mock check)
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            if (existingUsers.find(user => user.email === email)) {
                throw new Error('User with this email already exists');
            }

            // Save user to mock database
            const newUser = {
                id: `user_${Date.now()}`,
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Auto-login after registration
            const mockToken = `mock_jwt_token_${Date.now()}`;
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            setUser(newUser);
            setIsAuthenticated(true);

            toast.success(`Welcome, ${newUser.name}!`, {
            });
            
            return { success: true, user: newUser };
        } catch (error) {

            toast.error(error.message || 'Registration failed. Please try again.', {
            });
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        

        toast.success('Logged out successfully', {
        });
    };

    // Update user profile
    const updateUser = async (updatedData) => {
        try {
            // Update local user just a mock
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            
            toast.success('Profile updated successfully!', {
            });
            
            return { success: true, user: updatedUser };
        } catch (error) {

            toast.error('Failed to update profile', {
            });
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for using auth in other components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}