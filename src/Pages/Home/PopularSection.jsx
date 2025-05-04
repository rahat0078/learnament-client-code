import SectionHeading from "../../components/SectionHeading";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { GiWideArrowDunk } from "react-icons/gi";
import { Link } from "react-router-dom";

const PopularSection = () => {

    const axiosPublic = useAxiosPublic()

    const { data: classes = [], } = useQuery({
        queryKey: ["/allClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/popular-classes")
            return res.data
        }
    })



    return (
        <div className="section">
            <SectionHeading title="Most Popular Courses" description="Explore our most in-demand classes, handpicked based on the highest enrollment. Join thousands of learners in mastering new skills and advancing your knowledge today!"></SectionHeading>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 1250,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    classes.map(classItem => <SwiperSlide key={classItem._id}>
                        <div key={classItem._id} className="card shadow-xl">
                            <figure className='relative'>
                                <img
                                    src={classItem.image}
                                    className="w-full h-48 object-cover"
                                />
                                <span className="absolute right-4 bottom-5 w-20 h-20">
                                    <span className="absolute top-0 left-0 w-full h-full backdrop-blur-md rotate-45 rounded-lg z-10"></span>
                                    <span className="absolute w-full h-full text-center pt-2 text-white z-20 font-bold">
                                        {
                                            classItem?.enrollmentCount ? classItem?.enrollmentCount : '0'
                                        } <br /> Enrollment
                                    </span>
                                </span>
                            </figure>

                            <div className="card-body">
                                <h2 className="card-title text-lg font-bold">{classItem.title}</h2>
                                <p className="text-gray-500">
                                    <strong>Teacher:</strong> {classItem.name}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Price:</strong> ${classItem.price}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Description:</strong> {classItem.description.slice(0, 70)} ......
                                </p>
                                <div className="card-actions mt-4">
                                    <Link to={`/class/${classItem._id}`}
                                        className="btn-primary btn-sm flex items-center gap-1"
                                    >
                                        <GiWideArrowDunk />
                                        Enroll Now!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default PopularSection;