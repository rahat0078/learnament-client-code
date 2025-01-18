import HelmetTitle from "../../components/HelmetTitle";
import Slider from "./Slider";

const Home = () => {
    return (
        <>
            <HelmetTitle title={"Home"}></HelmetTitle>
            <div>
                <header>
                    <Slider/>
                </header>
            </div>
        </>
    );
};

export default Home;