import { BiCart, BiMenu, BiUser, BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import MenuDrawer from '../Layout/MenuDrawer';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { getTotalItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const totalItems = getTotalItems();

    const handleCart = () => {
        setIsOpen(!isOpen);
    };

    const handleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <nav className="container mx-auto py-4 px-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="w-45 shrink-0">
                        <Link to='/' className="navbarText text-5xl font-medium text-white whitespace-nowrap">
                            <span className="navbarText text-[#CB2957]">G</span>roove
                        </Link>
                    </div>

                    {/* Navigation Links  */}
                    <div className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link
                            to='/collections/guitars'
                            className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300 whitespace-nowrap"
                        >
                            Guitars
                        </Link>
                        <Link
                            to='/collections/amp'
                            className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300 whitespace-nowrap"
                        >
                            AMP
                        </Link>
                    </div>

                    {/* Right Icons  */}
                    <div className="flex items-center justify-end space-x-1 text-white w-55 shrink-0">
                        {/* User Profile / Auth Links */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-1">
                                <span className="text-sm text-[#CB2957] hidden sm:inline truncate max-w-20">
                                    {user?.firstName || user?.name || 'User'}
                                </span>
                                <Link
                                    to="/profile"
                                    className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300"
                                >
                                    <BiUser className='h-5 w-5' />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300"
                                >
                                    <BiLogOut className='h-5 w-5' />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300"
                            >
                                <BiUser className='h-5 w-5' />
                            </Link>
                        )}

                        {/* Cart Button with Badge */}
                        <button
                            onClick={handleCart}
                            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300 cursor-pointer"
                        >
                            <BiCart className='h-5 w-5' />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-[#CB2957] text-black text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </button>

                        {/* Search Bar */}
                        <div className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300">
                            <SearchBar />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={handleMenu}
                            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#0a0a0a] hover:text-[#CB2957] transition-all ease-in-out duration-300 md:hidden"
                        >
                            <BiMenu className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </nav>

            <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            <MenuDrawer menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        </>
    );
};

export default Navbar;