import { BiCart, BiMenu, BiUser } from 'react-icons/bi'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from 'react'

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    };

    return (
    <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div>
                <Link to='/' className="text-3xl font-medium">
                    Groove
                </Link>
            </div>

            <div className="hidden md:flex space-x-6 mr-10">
                <Link to='#' className="text-black hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Stratocaster
                </Link>
                <Link to='#' className="text-black hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Telecaster
                </Link>
                <Link to='#' className="text-black hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Les Paul
                </Link>
                <Link to='#' className="text-black hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    AMP
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <Link to="/profile" className='text-black'>
                    <BiUser className='h-6 w-6 text-black hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300'/>
                </Link>
                    <button
                        className="relative"
                        onClick={toggleCartDrawer}
                    >
                    <BiCart className='h-6 w-6 text-black hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                    <span className="absolute bg-[#CB2957] text-black rounded-full -top-2 text-xs px-1.5 py-px">
                        3
                    </span>
                </button>

                <SearchBar />

                <button className="md:hidden">
                    <BiMenu className='h-6 w-6 text-black hover:text-[#CB2957] transition-all ease-in-out duration-300 ' />
                </button>
            </div>
            </nav>
            
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
    )
}

export default Navbar