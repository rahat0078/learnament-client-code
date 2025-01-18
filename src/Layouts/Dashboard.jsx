import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <Link to="/" className="btn">Home</Link>
        </div>
    );
};

export default Dashboard;