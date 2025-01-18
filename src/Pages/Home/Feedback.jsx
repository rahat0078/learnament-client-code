import { FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "../../components/SectionHeading";

// swiper 
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Feedback = () => {


    const feedbacks = [
        {
            _id: "2fsdfsdfsdf13545",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro explicabo exercitationem laudantium blanditiis recusandae quod ipsum voluptatem asperiores laborum eum natus illum reiciendis dolores nemo consequuntur iusto, deserunt facere.',
            rating: 4.5,
            name: 'John Doe',
            image: 'https://i.ibb.co.com/C124GyT/2.jpg',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            _id: "2fsdfsdfsdf1354fsdfdsfedf5",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro explicabo exercitationem laudantium blanditiis recusandae quod ipsum voluptatem asperiores laborum eum natus illum reiciendis dolores nemo consequuntur iusto, deserunt facere.',
            rating: 5,
            name: 'Nikola Tesla',
            image: 'https://i.ibb.co.com/7zMpmbj/3.jpg',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            _id: "2fsdfsdfsdsfdrw3r343reff1354fsdfdsfedf5",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro explicabo exercitationem laudantium blanditiis recusandae quod ipsum voluptatem asperiores laborum eum natus illum reiciendis dolores nemo consequuntur iusto, deserunt facere.',
            rating: 4.2,
            name: 'Nikola Tesla',
            image: 'https://i.ibb.co.com/7zMpmbj/3.jpg',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            _id: "2fsdfsdfsdf13fgdfgerggfg54fsdfdsfedf5",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit porro explicabo exercitationem laudantium blanditiis recusandae quod ipsum voluptatem asperiores laborum eum natus illum reiciendis dolores nemo consequuntur iusto, deserunt facere.',
            rating: 3.2,
            name: 'Nikola Tesla',
            image: 'https://i.ibb.co.com/7zMpmbj/3.jpg',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
    ]

    return (
        <div className="py-16 flex flex-col justify-center items-center">
            <SectionHeading title="Feedback" description=""></SectionHeading>
            {/* rating data */}
            {/* quote  */}
            <FaQuoteLeft className="text-6xl mb-10" />

            <div className="container mx-auto">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        feedbacks.map(feedback => <SwiperSlide key={feedback._id}>
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <Rating readOnly className="max-w-48" value={feedback.rating} />
                                </div>
                                <div className="flex flex-col lg:flex-row justify-between gap-6 mt-8 px-16">
                                    <div className="w-64">
                                        <img className="h-56 w-full object-cover rounded-md" src={feedback.image} alt="" />
                                        <h5 className="text-2xl mt-4 font-bold">{feedback.name}</h5>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{feedback.title}</h3>
                                        <p>{feedback.description}</p>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Feedback;