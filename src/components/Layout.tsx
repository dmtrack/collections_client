import { Outlet } from 'react-router-dom';
import Navbar from '../scenes/global/Navbar';
import Footer from '../scenes/global/Footer';

const Layout = () => {
    return (
        <>
            <div className='app'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export { Layout };
