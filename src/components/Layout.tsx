import { Outlet } from 'react-router-dom';
import Navbar from '../scenes/global/Navbar';
import Footer from '../scenes/global/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className='app'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export { Layout };
