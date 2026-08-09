import Stratocastor from '../../assets/Stratocastor.jpg'
import Telecastor from '../../assets/Telecastor.jpg'
import { Link } from 'react-router';

const GuitarCollection = () => {
    return (
        <section className='py-16  px-4 lg:px-0' >
            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                <div className="relative flex">
                    <img
                        src={Stratocastor}
                        alt="Stratocastor-Halen"
                        className='w-full h-175 object-cover'
                    />
                    <div className="absolute bottom-8 left-8 bg-black text-white p-4 ">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Stratocastor's
                        </h2>
                        <Link to='collections/all?type=Stratocastor' className='text-[#CB2957] hover:text-white transition-all ease-in-out duration-300'>
                            Shop Now
                        </Link>
                    </div>
                </div>

                <div className="relative flex">
                    <img
                        src={Telecastor}
                        alt="Telecastor-mark"
                        className='w-full h-175 object-cover rotate-y-180'
                    />
                    <div className="absolute bottom-8 left-8 bg-black text-white p-4 ">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Telecastor's
                        </h2>
                        <Link to='collections/all?type=Telecastor' className='text-[#CB2957] hover:text-white transition-all ease-in-out duration-300'>
                            Shop Now
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default GuitarCollection