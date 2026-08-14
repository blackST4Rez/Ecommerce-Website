import {Link} from 'react-router'

const MenuContent = () => {
    return (
        <div className="p-4">
            <h2 className="text-[#CB2957] text-3xl font-semibold mb-4 p-3">Menu</h2>
                <nav className='space-y-4 px-3'>
                    <Link to='/collections/guitars' className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300'>Guitars</Link>
                    <Link to='/collections/amp' className='block text-white text-2xl hover:text-[#CB2957] transition-all ease-in-out duration-300'>AMP</Link>
                </nav>
        </div>
    )
}

export default MenuContent