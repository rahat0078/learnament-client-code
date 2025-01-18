import HelmetTitle from "../../components/HelmetTitle";
import PartnersSection from "./PartnersSection";
import Slider from "./Slider";

const Home = () => {
    return (
        <>
            <HelmetTitle title={"Home"}></HelmetTitle>
            <div>
                <header>
                    <Slider/>
                </header>
                <main className="container mx-auto bg-base-100">
                    <PartnersSection/>
                </main>
            </div>
        </>
    );
};

export default Home;