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
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Feedback = () => {

    const axiosPublic = useAxiosPublic()

    const { data: feedbacks } = useQuery({
        queryKey: ["/feedbacks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/feedbacks")
            return res.data
        }
    })


    

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
                        feedbacks?.map(feedback => <SwiperSlide key={feedback._id}>
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
                                        <p>{feedback.feedback}</p>
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