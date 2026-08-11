import { BiFastForwardCircle, BiShoppingBag, BiWalletAlt } from "react-icons/bi"


const FeaturedSection = () => {
    return (
        <section className="py-16 px-4 mb-8" >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Feature 1 */}
                <div className="flex flex-col items-center">
                    <div className="p-4 mb-4">
                        <BiShoppingBag className="text-3xl text-[#e02c5f]" />
                    </div>
                    <h4 className="tracking-tighter mb-2 text-[#e02c5f] text-2xl">FREE INTERNATIONAL SHIPPING</h4>
                    <p className="text-white text-xl tracking-tighter">On all orders over Rs.100</p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center">
                    <div className="p-4 mb-4">
                        <BiFastForwardCircle className="text-3xl text-[#e02c5f]" />
                    </div>
                    <h4 className="tracking-tighter mb-2 text-[#e02c5f] text-2xl">45 DAYS RETURN</h4>
                    <p className="text-white text-xl tracking-tighter">Money Back Guarantee</p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center">
                    <div className="p-4 mb-4">
                        <BiWalletAlt className="text-3xl text-[#e02c5f]" />
                    </div>
                    <h4 className="tracking-tighter mb-2 text-[#e02c5f] text-2xl">SECURE CHECKOUT</h4>
                    <p className="text-white text-xl tracking-tighter">100% secure checkout proces</p>
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection