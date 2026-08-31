
import { Link, useNavigate, useLocation } from 'react-router';
import LoginImage from '../../assets/LoginImage.jpg';
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    {/* Get the page user was trying to visit */ }
    const from = location.state?.from || '/';

    {/* Redirect if already logged in */ }
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);
        setIsLoading(false);

        if (result.success) {
            {/* Redirect to the page they were trying to visit */ }
            navigate(from, { replace: true });
        } else {
            setError(result.error || 'Invalid email or password');
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-end"
            style={{
                backgroundImage: `url(${LoginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <h2 className="navbarText text-7xl text-white">
                            <span className="navbarText text-[#CB2957]">G</span>
                            roove
                        </h2>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-6 text-white">
                        Hey There!
                    </h2>

                    <p className="text-center mb-6 text-white">
                        Enter your email and password to Login
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="userexample@gmail.com"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="Password"
                            required
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full border-2 border-black bg-black text-[#CB2957] p-3 font-semibold hover:bg-[#CB2957] hover:text-black text-xl transition-all ease-in-out duration-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Sign In'}
                    </button>

                    <p className="mt-6 text-center text-xl text-white">
                        Don't have an account?
                        <Link to="/register" className="text-[#CB2957] ml-1 transition-all ease-in-out duration-300">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;