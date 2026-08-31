import { Link } from 'react-router'
import featured from '../../assets/BottomImage.jpg'

const FeaturedCollection = () => {
    return (
        <section className="lg:px-0">
            <div
                className="w-full min-h-150 bg-fixed bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                    backgroundImage: `url(${featured})`,
                }}
            >
                <div className="w-full h-full flex items-center justify-end">
                    <div className="max-w-4xl p-8 lg:text-left">
                        <h2 className="text-3xl font-semibold text-gray-50 mb-6">
                            Let there be rock.
                        </h2>
                        <h2 className="HeroText text-7xl lg:text-6xl font-bold mb-4 text-[#CB2957]">
                            ROCK & ROLL
                        </h2>
                        <h2 className="HeroText text-7xl lg:text-6xl font-bold mb-8 text-[#CB2957]">
                            EVERYDAY
                        </h2>
                        <p className="text-lg text-gray-50 mb-10 max-w-2xl">
                            Rock and roll keeps you in a constant state of juvenile delinquency.
                        </p>
                        <Link
                            to="/collections/all"
                            className="bg-[#CB2957] text-black font-bold px-6 py-3 text-lg hover:bg-black hover:text-[#CB2957] border-2 border-[#CB2957] transition-all ease-in-out duration-300 inline-block"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCollection