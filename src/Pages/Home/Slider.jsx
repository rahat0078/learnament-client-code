import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import img1 from '../../assets/slider/001.jpg';
import img2 from '../../assets/slider/002.jpg';
import img3 from '../../assets/slider/003.jpg';
import img4 from '../../assets/slider/004.webp';


const Slider = () => {


    const data = [
        {
            title: "Empower Your Learning Journey",
            description: "Explore foundational skills, connect with expert teachers, and grow your knowledge.",
            image: img1
        },
        {
            title: "Expert Teachers, Tailored Classes",
            description: "Join classes led by professionals across various disciplines.",
            image: img2
        },
        {
            title: "Transform Education into Opportunities",
            description: "Unlock new skills and build a brighter future with Learnament.",
            image: img3
        },
        {
            title: "Learn Anytime, Anywhere",
            description: "Access quality education and resources from the comfort of your home.",
            image: img4
        }
    ]



    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {
                    data.map((item, index) => <SwiperSlide key={index}>
                        <div className='flex justify-center items-center flex-col text-center px-4 bg-cover bg-no-repeat bg-center h-[75vh]'
                            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${item.image})` }}>
                            <h1 className='text-3xl md:text-4xl lg:text-6xl text-gray-100 font-bold'>{item.title}</h1>
                            <p className='text-xl md:text-2xl text-gray-300 pt-6'>{item.description}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div >
    );
};

export default Slider;