import { BiCart, BiMenu, BiUser, BiPlus } from 'react-icons/bi'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from 'react'
import MenuContent from '../Cart/MenuContent'
import MenuDrawer from '../Layout/MenuDrawer'
import { useCart } from '../Context/CartContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const { getTotalItems } = useCart() // Get the total items function
    const totalItems = getTotalItems() // Calculate total items

    const handleCart = () => {
        setIsOpen(!isOpen)
    }

    const handleMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    return (
    <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
            <div>
                <Link to='/' className="navbarText text-5xl font-medium text-white">
                    <span className="navbarText text-[#CB2957]">G</span>roove
                </Link>
            </div>

            <div className="hidden md:flex space-x-6 mr-2">
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
                    {totalItems > 0 && ( // Only show badge if there are items
                        <span className="absolute bg-[#CB2957] text-black rounded-full -top-2 text-xs px-1.5 py-px">
                            {totalItems}
                        </span>
                    )}
                </button>

                <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />

                <button onClick={handleMenu}>
                    <BiMenu className='h-6 w-6 md:hidden text-white hover:text-[#CB2957] transition-all ease-in-out duration-300 ' />
                </button>
                    
            <MenuDrawer menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />

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

                <MenuContent />

            </div>
    </>
    )
}

export default Navbar