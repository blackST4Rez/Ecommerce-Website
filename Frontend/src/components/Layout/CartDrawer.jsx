import { BiPlus } from "react-icons/bi";

const CartDrawer = ({
    drawerOpen,
    toggleCartDrawer
}) => {
    return (
        <div className={`fixed border-[#CB2957] border-l-10 top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-black transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-4 ">
                <BiPlus
                    className="h-8 w-8 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                    onClick={toggleCartDrawer}
                />
            </div>

            <div className="grow p-4 overflow-y-auto">
                <h2 className="text-[#CB2957] text-3xl font-semibold mb-4 p-3">Your Cart</h2>
            </div>

            <div className="p-4 text-white font-semibold sticky bottom-0">
                <button className="w-full bg-[#CB2957] text-black border border-black py-3 font-semibold hover:bg-black hover:border-white hover:text-white transition-all ease-in-out duration-300 " >
                    Checkout
                </button>
                <p className="text-sm tracking-tight text-white mt-2 text-center">
                    Shipping, Taxes & Discount Codes calculated at checkout.
                </p>
            </div>

        </div>
    )
}

export default CartDrawer