import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='font-funnelSans'>
            <div className='backdrop-blur-3xl'>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;