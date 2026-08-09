import { BiCart, BiMenu, BiUser, BiPlus } from 'react-icons/bi'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from 'react'

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }
    
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    };

    return (
    <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div>
                <Link to='/' className="navbarText text-5xl font-medium text-white">
                    Groove
                </Link>
            </div>

            <div className="hidden md:flex space-x-6 mr-10">
                <Link to='#' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Stratocaster
                </Link>
                <Link to='#' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Telecaster
                </Link>
                <Link to='#' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Les Paul
                </Link>
                <Link to='#' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    AMP
                </Link>
            </div>

            <div className="flex items-center space-x-4 text-white">
                <Link to="/profile">
                    <BiUser className='h-6 w-6 text-white hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300'/>
                </Link>
                    <button
                        className="relative"
                        onClick={toggleCartDrawer}
                    >
                    <BiCart className='h-6 w-6 text-white hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                    <span className="absolute bg-[#CB2957] text-black rounded-full -top-2 text-xs px-1.5 py-px">
                        3
                    </span>
                </button>

                <SearchBar />

                <button className="md:hidden" onClick={toggleNavDrawer}>
                    <BiMenu className='h-6 w-6 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300 ' />
                </button>
            </div>
            </nav>
            
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-black transform transition-transform duration-200 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawer}>
                        <BiPlus
                            className="h-6 w-6 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                        />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-[#CB2957] text-3xl font-semibold mb-4 p-3">Menu</h2>
                    <nav className='space-y-4 px-3'>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300' >Stratocastor</Link>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300' >Telecastor</Link>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300' >Les Paul</Link>
                    </nav>
                </div>
            </div>
    </>
    )
}

export default Navbar