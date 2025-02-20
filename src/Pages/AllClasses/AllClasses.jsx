import SectionHeading from '../../components/SectionHeading';
import HelmetTitle from './../../components/HelmetTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { GiWideArrowDunk } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const AllClasses = () => {

    const axiosPublic = useAxiosPublic()
    const [filter, setFilter] = useState('')
    const [search, setSearch] = useState("")
    console.log(filter);

    const { data: classes = [],  } = useQuery({
        queryKey: ["/allClasses", search], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/allClasses?search=${search}`);
            return res.data;
        }
    });

    return (
        <div className='container mx-auto px-4'>
            <HelmetTitle title="All Classes"></HelmetTitle>
            <SectionHeading title="Explore Our All Verified Classes" description="Browse through a wide range of classes approved by our admin. Enroll in the ones that suit your learning needs and start your journey today!"></SectionHeading>
            <div className='flex items-center gap-4 justify-end'>
                <div className="relative w-full max-w-[220px]">
                    <input
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-full pr-[40px]"
                    />
                    <button className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </button>
                </div>

                <select onChange={e => setFilter(e.target.value)} placeholder="Filter" className="select select-bordered w-full max-w-[220px]">
                    <option>All</option>
                    <option>easy</option>
                    <option>medium</option>
                    <option>hard</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 mb-16">
                {classes.map((classItem) => (
                    <div key={classItem._id} className="card shadow-xl">
                        <figure className='relative'>
                            <img
                                src={classItem.image}
                                className="w-full h-48 object-cover"
                            />
                            <span className="absolute right-4 bottom-5 w-20 h-20">
                                <span className="absolute top-0 left-0 w-full h-full bg-orange-500 rotate-45 rounded-lg z-10"></span>
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
                                    className="btn btn-sm text-white bg-[#05A698] hover:bg-[#058ea6] flex items-center gap-1"
                                >
                                    <GiWideArrowDunk />
                                    Enroll Now!
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClasses;