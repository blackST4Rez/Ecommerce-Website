
import { BiPlus } from "react-icons/bi";
import CartContent from "../Cart/CartContent";
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router';

const CartDrawer = ({ isOpen, setIsOpen }) => {
    const { getTotalPrice, cartItems } = useCart();
    const navigate = useNavigate();
    const totalPrice = getTotalPrice();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        setIsOpen(false);
        navigate('/checkout');
    };

    return (
        <div className={`fixed top-0 right-0 w-[85%] sm:w-80 md:w-96 lg:w-112.5 h-full bg-[#141313] transform transition-transform duration-300 flex flex-col z-50 
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Header with close button - outside scrollable area */}
            <div className="flex items-center justify-between p-4 shrink-0">
                <h2 className="text-[#CB2957] text-2xl sm:text-3xl font-semibold">Your Cart</h2>
                <BiPlus
                    onClick={handleClose}
                    className="h-8 w-8 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar px-4">
                <CartContent />
            </div>

            {/* Footer - outside scrollable area */}
            <div className="p-4 text-white font-semibold shrink-0 bg-[#141313] border-t border-gray-800">
                <div className="flex justify-between mb-2">
                    <span>Total:</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full hover:bg-[#CB2957] hover:text-black border hover:border-black py-3 font-semibold bg-black border-[#CB2957] text-white transition-all ease-in-out duration-300"
                >
                    Checkout
                </button>
                <p className="text-xs sm:text-sm tracking-tight text-gray-400 mt-2 text-center">
                    Shipping, Taxes & Discount Codes calculated at checkout.
                </p>
            </div>
        </div>
    );
};

export default CartDrawer;