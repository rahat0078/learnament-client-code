import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className='font-funnelSans'>
            <div className='bg-base-200 sticky top-0 z-10'>
                <Navbar />
            </div>
            <Outlet />
            <Footer />

            <Toaster />

        </div>
    );
};

export default MainLayout;