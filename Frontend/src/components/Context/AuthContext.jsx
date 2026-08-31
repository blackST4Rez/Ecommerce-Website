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

            // Check if user exists in mock database
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = existingUsers.find(user => user.email === email);
            
            if (!foundUser) {
                throw new Error('User not found. Please register first.');
            }

            // Mock user data 
            const mockUser = {
                id: foundUser.id,
                firstName: foundUser.firstName || 'User',
                lastName: foundUser.lastName || '',
                email: email,
                avatar: null,
                createdAt: foundUser.createdAt || new Date().toISOString()
            };

            const mockToken = 'mock_jwt_token_xyz_123';

            // Save to localStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            setUser(mockUser);
            setIsAuthenticated(true);
            
            // Welcome message with first name only
            toast.success(`Welcome back, ${mockUser.firstName}!`, {
                duration: 3000
            });
            
            return { success: true, user: mockUser };
        } catch (error) {
            toast.error(error.message || 'Login failed. Please try again.', {
                duration: 3000
            });
            return { success: false, error: error.message };
        }
    };

    //  Register Function 
    const register = async (firstName, lastName, email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            if (existingUsers.find(user => user.email === email)) {
                throw new Error('User with this email already exists');
            }

            // Save user with firstName and lastName
            const newUser = {
                id: `user_${Date.now()}`,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email,
                createdAt: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            toast.success('Registration successful! Please login.', {
                duration: 3000
            });
            
            return { success: true, user: newUser };
        } catch (error) {
            toast.error(error.message || 'Registration failed. Please try again.', {
                duration: 3000
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
            duration: 3000
        });
    };

    // Update user profile
    const updateUser = async (updatedData) => {
        try {
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            
            toast.success('Profile updated successfully!', {
                duration: 3000
            });
            
            return { success: true, user: updatedUser };
        } catch (error) {
            toast.error('Failed to update profile', {
                duration: 3000
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