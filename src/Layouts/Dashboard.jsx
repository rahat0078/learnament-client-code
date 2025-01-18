import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <Link to="/" className="btn">Home</Link>



            <Toaster />

        </div>
    );
};

export default Dashboard;