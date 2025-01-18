import HelmetTitle from "../../components/HelmetTitle";
import PartnersSection from "./PartnersSection";
import PopularSection from "./PopularSection";
import Slider from "./Slider";
import Feedback from './Feedback';

const Home = () => {
    return (
        <>
            <HelmetTitle title={"Home"}></HelmetTitle>
            <div>
                <header>
                    <Slider/>
                </header>
                <main className="container mx-auto bg-base-100 px-4">
                    <PartnersSection/>
                    <PopularSection/>
                    <Feedback/>

                </main>
            </div>
        </>
    );
};

export default Home;