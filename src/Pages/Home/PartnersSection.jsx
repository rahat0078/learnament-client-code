import SectionHeading from "../../components/SectionHeading";
import img1 from '../../assets/partners/partners-001.jpg';
import img2 from '../../assets/partners/partners-002.jpg';
import img3 from '../../assets/partners/partners-003.avif';
import img4 from '../../assets/partners/partners-004.jpeg';
import img5 from '../../assets/partners/partners-005.avif';


const partners = [
    {
        title: "EduCorp",
        description: "Empowering students with innovative learning tools.",
        image: img1
    },
    {
        title: "TechMentor",
        description: "Driving digital transformation with expert mentorship.",
        image: img2
    },
    {
        title: "SkillUp",
        description: "Advancing skills through hands-on training.",
        image: img3
    },
    {
        title: "InnovateEd",
        description: "Pioneering education with cutting-edge technology.",
        image: img4
    },
    {
        title: "LearnEase",
        description: "Making learning engaging and accessible.",
        image: img5
    }
];

const PartnersSection = () => {
    return (
        <section className="section">
            <SectionHeading title="Our Partners" description="Collaboration that drives innovation in education."></SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg shadow-md hover:scale-105 hover:bg-base-200 transition duration-500 ease-in-out"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-center">
                            <img
                                src={partner.image}
                                alt={partner.title}
                                className="w-24 h-24 object-cover rounded-full"
                            />
                            <h3 className="text-xl font-semibold overflow-hidden">{partner.title}</h3>
                        </div>
                        <p className="text-gray-500 mt-2">{partner.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PartnersSection;
