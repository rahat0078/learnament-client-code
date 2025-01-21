import loadingGif from '../assets/loading.gif';

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <img className='w-64' src={loadingGif} alt="" />
        </div>
    );
};

export default LoadingSpinner;