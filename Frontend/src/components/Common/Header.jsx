import Topbar from '../Layout/Topbar'
import Navbar from '../Common/Navbar'

const Header = () => {
    return (
        <header className='border-b border-gray-400'>
            <Topbar />
            <Navbar />
        </header>
    )
}

export default Header