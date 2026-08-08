import { BiLogoInstagram, BiLogoMeta, BiLogoTwitter } from 'react-icons/bi'

const Topbar = () => {
    return (
        <div className='bg-black text-[#CB2957]'>
            <div className='container mx-auto flex justify-between items-center py-3'>
                <div className='hidden md:flex items-center space-x-5'>
                    <a href="" className='text-blue-700 hover:text-white transition-all ease-in-out duration-300' >
                        <BiLogoMeta className='h-6 w-6' />
                    </a>
                    <a href="" className='text-red-600 hover:text-white transition-all ease-in-out duration-300' >
                        <BiLogoInstagram className='h-6 w-6' />
                    </a>
                    <a href="" className='text-sky-500 hover:text-white transition-all ease-in-out duration-300' >
                        <BiLogoTwitter className='h-6 w-6' />
                    </a>
                </div>
                <div className="text-l text-center grow">
                    <span >Shipping WorldWide - Fast & Reliable</span>
                </div>
                <div className="text-l hidden md:block">
                    <a href="" className='text-[#CB2957] hover:text-white transition-all ease-in-out duration-300'>+977 98 0329 4610</a>
                </div>
            </div>
        </div>
    )
}

export default Topbar