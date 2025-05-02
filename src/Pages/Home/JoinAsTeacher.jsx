import { Link } from 'react-router-dom';
import teacherImg from '../../assets/join-teacher.avif';


const JoinAsTeacher = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center py-16 gap-8 container mx-auto">
            <div className="w-full lg:w-1/2">
                <img
                    src={teacherImg}
                    alt="Inspiring Teacher"
                    className="rounded-lg shadow-lg w-full"
                />
            </div>

            
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Share Your Knowledge, Inspire the Future!</h2>
                <p className="text-gray-600 mb-6">
                    Join our platform and empower learners worldwide. Create flexible schedules, connect with motivated students, and make a lasting impact from the comfort of your home.
                </p>
                <Link to="/TeachOnLearnament" className="btn-primary">
                    Join as a Teacher
                </Link>
            </div>
        </div>


    );
};

export default JoinAsTeacher;