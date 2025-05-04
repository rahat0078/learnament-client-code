import HelmetTitle from "../../components/HelmetTitle";
import PartnersSection from "./PartnersSection";
import PopularSection from "./PopularSection";
import Slider from "./Slider";
import Feedback from './Feedback';
import HomeStats from "./HomeStats";
import JoinAsTeacher from "./JoinAsTeacher";
import Faq from "./Faq";
import NextLevel from "./NextLevel";

const Home = () => {
    return (
        <>
            <HelmetTitle title={"Home"}></HelmetTitle>
            <div>
                <header>
                    <Slider />
                </header>
                <main className="container mx-auto px-2 md:px-0">
                    <PartnersSection />
                    <PopularSection />
                    <Feedback />
                </main>
                <section className="bg-base-200 section">
                    <HomeStats />
                </section>
                <JoinAsTeacher />
                <section className="bg-base-200 px-2 md:px-0 section">
                    <Faq />
                </section>
                <NextLevel />
            </div>
        </>
    );
};

export default Home;