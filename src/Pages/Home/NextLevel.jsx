import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import next_level from '../../assets/next-level.jpg';
import SectionHeading from './../../components/SectionHeading';
import { Link } from 'react-router-dom';
const NextLevel = () => {
    return (
        <div>
            <div className="md:py-32 py-24 px-4 lg:py-36 xl:py-40 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.70)), url(${next_level})` }}>
                <div className="max-w-7xl mx-auto px-6 text-center text-white">
                    <SectionHeading title="Ready to Take the Next Step in Your Learning Journey?" description="Join thousands of learners who are transforming their lives with Learnament. Explore courses, gain skills, and achieve your goals—all at your own pace."></SectionHeading>
                    <div className="flex justify-center space-x-4">
                        <p className="text-xl font-bold text-[#2cdea9] flex items-center gap-2">
                            Get Started Now <FaArrowRight/>
                        </p>
                        <Link to="allClasses" className="btn btn-outline text-lg text-[#2cdea9] hover:text-white border-[#2cdea9] hover:bg-[#058ea6]">
                            Explore Courses <FaExternalLinkAlt />

                        </Link> 

                    </div>
                </div>
            </div>

        </div>
    );
};

export default NextLevel;