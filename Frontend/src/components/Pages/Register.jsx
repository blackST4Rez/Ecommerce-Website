import { Link, useNavigate } from 'react-router';
import RegisterImage from '../../assets/RegisterImage.jpg';
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        const result = await register(firstName, lastName, email, password);
        setIsLoading(false);

        if (result.success) {
            navigate('/login', { replace: true });
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div 
            className="relative min-h-screen flex items-center justify-end"
            style={{
                backgroundImage: `url(${RegisterImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                        Create Account
                    </h2>

                    <p className="text-center mb-6 text-white">
                        Join the Groove community
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    {/* First Name Field */}
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="John"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="Doe"
                            required
                            disabled={isLoading}
                        />
                    </div>

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
                            placeholder="Password (min 6 characters)"
                            required
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="Confirm Password"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full border-2 border-black bg-black text-[#CB2957] p-3 font-semibold hover:bg-[#CB2957] hover:text-black text-xl transition-all ease-in-out duration-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <p className="mt-6 text-center text-xl text-white">
                        Already have an account?
                        <Link to="/login" className="text-[#CB2957] ml-1 transition-all ease-in-out duration-300">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;