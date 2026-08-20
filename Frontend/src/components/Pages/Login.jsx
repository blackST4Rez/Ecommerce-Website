import { Link } from 'react-router'
import LoginImage from '../../assets/LoginImage.jpg'
import { useState } from 'react'

const Login = () => {

    const [getEmail, setGetEmail] = useState("")
    const [getPassword, setGetPassword] = useState("")

    const handleUserEmail = () => {

    }

    const handleUserPassword = () => {
        
    }
    
    return (
        <div 
            className="relative min-h-screen flex items-center justify-end"
            style={{
                backgroundImage: `url(${LoginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
            }}
        >
            
            {/* Right side - Form */}
            <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 ">
                <form className="w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <h2 className="navbarText text-7xl text-white">
                            <span className=" navbarText text-[#CB2957]">G</span>
                            roove
                        </h2>
                    </div>
                    <h2 className="navbarText text-2xl font-bold text-center mb-6 text-white">
                        Hey There!
                    </h2>
                    <p className="text-center mb-6 text-white">
                        Enter your Username and Password to Login
                    </p>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="userexample@gmail.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-white focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-white text-xl bg-transparent"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-black bg-black text-[#CB2957] p-3 font-semibold hover:bg-[#CB2957] hover:text-black text-xl transition-all ease-in-out duration-300"
                    >
                        Sign In
                    </button>
                    <p className="mt-6 text-center text-xl text-white">
                        Don't have an account?
                        <Link to="/register" className="text-[#CB2957] ml-1 transition-all ease-in-out duration-300">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login