import { useRef, useState } from "react"
import { BiPlus, BiSearch } from "react-icons/bi";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef()

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);
        setIsOpen(false);
    }

    return (
        <div className={`flex item-center justify-center w-full transition-all ease-in-out duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-[#191b1c] h-30 z-50" : "w-auto"}`}>
            {isOpen ? (
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center justify-center w-full" >
                    <div className="relative w-1/2">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#212324] px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full
                            placeholder:text-gray-300 "
                        />

                        <button type="submit" className="absolute right-2 -top-1/7 transform translate-y-1/2 text-white hover:text-[#CB2957] transition-all ease-in-out duration-300" >
                            <BiSearch className="h-6 w-6" />
                        </button>

                        <button type="button" onClick={handleSearchToggle} className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-white  hover:text-[#CB2957] hover:rotate-90 transition-all ease-in-out duration-300" >
                            <BiPlus className="h-8 w-8 rotate-135" />
                        </button>

                    </div>
                </form>) : (
                <button onClick={handleSearchToggle} className="hover:bg-black h-6 w-6 rounded-full hover:text-[#CB2957] transition-all ease-in-out duration-300" >
                    <BiSearch className="h-6 w-6" />
                </button>
            )}
        </div>
    )
}

export default SearchBar