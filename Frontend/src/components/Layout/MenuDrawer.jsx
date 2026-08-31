import { BiPlus } from "react-icons/bi";
import MenuContent from "../Cart/MenuContent";

const MenuDrawer = ({
    menuIsOpen,
    setMenuIsOpen
}) => {

    const handleClose = () => {
        setMenuIsOpen(false)
    }

    return (
        <div className={`fixed top-0 left-0 w-80 h-full bg-[#141313] transform transition-transform duration-300 flex flex-col z-50 
            ${menuIsOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
        >
            <div className="absolute right-0 top-4 flex justify-end p-4 ">
                <BiPlus
                    onClick={handleClose}
                    className="h-8 w-8 rotate-135 text-white cursor-pointer hover:text-[#CB2957] hover:rotate-45 transition-all ease-in-out duration-300"
                />
            </div>

            <MenuContent />

        </div>
    )
}

export default MenuDrawer