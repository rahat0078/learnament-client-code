import { FaHome } from 'react-icons/fa';
import error404 from '../../assets/error404.gif';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div className='flex justify-center flex-col items-center min-h-screen'>
            <img src={error404} alt="" />
            <Link to="/" className='btn btn-accent rounded-md'>Back to home <FaHome/></Link>
        </div>
    );
};

export default Error;