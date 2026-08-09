import { BiLogoInstagram, BiLogoMeta, BiLogoTwitter, BiPhone } from 'react-icons/bi'
import {Link} from 'react-router'

const Footer = () => {
    return (
        <footer className="border-t border-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
                <div>
                    <h3 className="text-xl text-white mb-4">Newsletter</h3>
                    <p className="text-white mb-6">
                        Be the first to hear about new products, exclusive events, and
                        online offers.
                    </p>
                    <p className="text-[#CB2957] font-medium mb-6">Sign Up and Get 10% off your first order.</p>

                    <form className="flex">
                        <input type="email" placeholder="Your e-mail" className="p-3 w-65 text-sm border-t border-l border-b border-white focus:outline-none transition-all ease-in-out duration-300 placeholder-white " required />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 text-sm hover:text-[#CB2957] transition-all ease-in-out duration-300"
                        >
                            Submit
                        </button>
                    </form>

                </div>

                <div>
                        <h3 className="text-lg text-[#CB2957] mb-4">Shop</h3>
                        <ul className="space-y-2 text-white">
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    Stratocastor
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    Telecastor
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    Les Paul
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    AMP
                                </Link>
                            </li>
                        </ul>
                </div>
                
                <div>
                        <h3 className="text-lg text-[#CB2957] mb-4">Support</h3>
                        <ul className="space-y-2 text-white">
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    Contact US
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    FAQ's
                                </Link>
                            </li>
                            <li>
                                <Link to='#' className='hover:text-[#CB2957] transition-all ease-in-out duration-300' >
                                    Features
                                </Link>
                            </li>
                        </ul>
                    </div>

                <div>
                    <h3 className="text-lg text-[#CB2957] mb-4" >Follow Us</h3>
                    <div className="flex items-center space-x-4 mb-6">
                        <a
                            href=""
                            target='_blank'
                            rel='noopener noreferrer' >
                            
                            <BiLogoMeta className='w-8 h-8 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                        </a>
                        <a
                            href=""
                            target='_blank'
                            rel='noopener noreferrer' >
                            
                            <BiLogoInstagram className='w-8 h-8 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                        </a>
                        <a
                            href=""
                            target='_blank'
                            rel='noopener noreferrer' >
                            
                            <BiLogoTwitter className='w-8 h-8 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300' />
                        </a>
                    </div>
                            <p className='text-white'>Call Us</p>
                            <p>
                                <BiPhone className='inline-block mr-2' />
                                +977 98 0329 4610
                            </p>
                </div>
            </div>

            <div className="container mx-auto mt-12 px-4 lg-px-0 border-t border-white pt-6 ">
                <p className='text-[#CB2957] text-sm tracking-tight text-center' >
                    &copy 2026, blackST4Rez. All Rights Reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer