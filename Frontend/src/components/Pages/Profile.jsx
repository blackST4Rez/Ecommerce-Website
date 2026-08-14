import MyOrders from "./MyOrders"


const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="grow container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Left Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 p-6">
                        <h1 className="text-2xl md:text-2xl font-bold mb-4 text-white">
                            Raka Maharjan
                        </h1>
                        <p className="text-lg text-[#CB2957] mb-4">raka2026@gmail.com</p>
                        <button className="w-full hover:bg-black border-2 hover:border-[#CB2957] hover:text-white py-2 px-4 bg-[#CB2957] text-black transition-all ease-in-out duration-300">
                            Logout
                        </button>
                    </div>
                {/* Right Section */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <MyOrders />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile