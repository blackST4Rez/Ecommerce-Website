import HeroImage from '../../assets/HeroImage.jpg'
import { Link } from 'react-router'

const Hero = () => {
    return (
        <section className='relative'>
            <img
                src={HeroImage}
                alt="HeroImage"
                className='w-full h-100 md:h-150 lg:h-187.5 object-cover '
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-[#CB2957] p-6">
                    <h1 className="HeroText text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                        Rock & Roll <br />Ready
                    </h1>
                    <Link to='/collections/amp' className='bg-black text-[#CB2957] px-8 py-4 text-lg font-bold hover:bg-[#CB2957] hover:text-black transition-all ease-in-out duration-300' >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero