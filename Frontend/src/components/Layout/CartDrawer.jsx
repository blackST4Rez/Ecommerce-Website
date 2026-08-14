import { BiPlus } from "react-icons/bi";
import CartContent from "../Cart/CartContent";

const CartDrawer = ({
    isOpen,
    setIsOpen
}) => {

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className={`fixed top-0 right-0 w-[85%] sm:w-80 md:w-96 lg:w-112.5 h-full bg-[#141313] transform transition-transform duration-300 flex flex-col z-50 
            ${isOpen
                ? "translate-x-0"
                : "translate-x-full"
                }`}
        >
            <div className="absolute right-0 top-4 flex justify-end p-4 ">
                <BiPlus
                    onClick={handleClose}
                    className="h-8 w-8 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                />
            </div>

            <div className="grow p-4 overflow-y-auto">
                <h2 className="text-[#CB2957] text-2xl sm:text-3xl font-semibold mb-4 p-3">Your Cart</h2>
                <CartContent />
            </div>

            <div className="p-4 text-white font-semibold sticky bottom-0 bg-[#141313] border-t border-gray-800">
                <button className="w-full hover:bg-[#CB2957] hover:text-black border hover:border-black py-3 font-semibold bg-black border-[#CB2957] text-white transition-all ease-in-out duration-300" >
                    Checkout
                </button>
                <p className="text-xs sm:text-sm tracking-tight text-gray-400 mt-2 text-center">
                    Shipping, Taxes & Discount Codes calculated at checkout.
                </p>
            </div>

        </div>
    )
}

export default CartDrawer