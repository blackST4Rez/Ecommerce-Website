import Footer from '../Common/Footer'
import Header from '../Common/Header'
import { Outlet } from 'react-router'

const UserLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default UserLayout