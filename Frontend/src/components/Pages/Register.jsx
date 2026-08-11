import { useState } from "react"
import { Link } from 'react-router'
import RegisterImage from '../../assets/RegisterImage.jpg'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Registered.',{name, email, password});
        
    }
    
    return (
        <div 
            className="relative min-h-screen flex items-center justify-start"
            style={{
                backgroundImage: `url(${RegisterImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            
            {/* Right side - Form */}
            <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 ">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
                    <div className="flex justify-center mb-6">
                        <h2 className="navbarText text-7xl text-black">
                            <span className=" navbarText text-[#CB2957]">G</span>
                            roove
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-black">
                        Hey There!
                    </h2>
                    <p className="text-center mb-6 text-black">
                        Enter your Username and Password to Login
                    </p>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-black">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-black focus:outline-none focus:ring-2 focus:ring-[#CB2957] placeholder-black text-xl bg-transparent text-black"
                            placeholder="user123"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-black">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-black focus:outline-none focus:ring-2 focus:ring-[#CB2957] placeholder-black text-xl bg-transparent text-black"
                            placeholder="userexample@gmail.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-semibold mb-2 text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-black focus:outline-none focus:ring-2 focus:ring-[#CB2957] text-black text-xl bg-transparent"
                            placeholder="............"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-black bg-black text-[#CB2957] p-3 font-semibold hover:bg-[#CB2957] hover:text-black text-xl transition-all ease-in-out duration-300"
                    >
                        Sign Up
                    </button>
                    <p className="mt-6 text-center text-xl text-black">
                        Don't have an account?
                        <Link to="/login" className="text-[#CB2957] ml-1 hover:text-black transition-all ease-in-out duration-300">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register