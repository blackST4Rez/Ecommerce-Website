
import { useAuth } from '../Context/AuthContext';
import MyOrders from './MyOrders';
import { useNavigate } from 'react-router';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="grow container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Left Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 p-6">
                        <h1 className="text-2xl md:text-2xl font-bold mb-2 text-white">
                            {user?.firstName || 'User'}
                        </h1>
                        <p className="text-lg text-[#CB2957] mb-2">
                            {user?.email}
                        </p>
                        <p className="text-sm text-white mb-4">
                            Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <button 
                            onClick={handleLogout}
                            className="w-full hover:bg-black border-2 hover:border-[#CB2957] hover:text-white py-2 px-4 bg-[#CB2957] text-black transition-all ease-in-out duration-300 rounded"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MyOrders />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;