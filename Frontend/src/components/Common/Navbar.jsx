import { BiCart, BiMenu, BiUser, BiPlus } from 'react-icons/bi'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleCart = () => {
        setIsOpen(!isOpen)
    }

    return (
    <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div>
                <Link to='/' className="navbarText text-5xl font-medium text-white">
                    <span className="navbarText text-[#CB2957]">G</span>roove
                </Link>
            </div>

            <div className="hidden md:flex space-x-6 mr-10">
                <Link to='/collections/guitars' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    Guitars
                </Link>
                <Link to='/collections/amp' className="text-white hover:text-[#CB2957] text-lg font-medium transition-all ease-in-out duration-300">
                    AMP
                </Link>
            </div>

            <div className="flex items-center space-x-4 text-white">
                <Link to="/profile">
                    <BiUser className='h-6 w-6 text-white hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300'/>
                </Link>
                <button className="relative">
                    <BiCart onClick={handleCart} className='h-6 w-6 text-white hover:bg-black hover:rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                    <span className="absolute bg-[#CB2957] text-black rounded-full -top-2 text-xs px-1.5 py-px">
                        3
                    </span>
                </button>

                <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />

                <button className="md:hidden">
                    <BiMenu className='h-6 w-6 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300 ' />
                </button>
            </div>
            </nav>
            
            <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className='fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-black transform transition-transform duration-200 z-50 -translate-x-full'>
                <div className="flex justify-end p-4">
                    <button>
                        <BiPlus
                            className="h-6 w-6 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                        />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-[#CB2957] text-3xl font-semibold mb-4 p-3">Menu</h2>
                    <nav className='space-y-4 px-3'>
                        <Link to='/collections/guitars' className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300'>Guitars</Link>
                        <Link to='/collections/amp' className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300'>AMP</Link>
                        <Link to='#' className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300'>Accessories</Link>
                    </nav>
                </div>
            </div>
    </>
    )
}

export default Navbar