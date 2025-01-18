import statimg from '../../assets/homeStats.jpeg';


const HomeStats = () => {
    return (
        <section className="py-16 container mx-auto">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                <div className="flex flex-col space-y-6">
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Users</h3>
                            <p className="text-lg ">Over 50,000 active users</p>
                        </div>
                        <div className="text-4xl font-bold text-indigo-600">50,000+</div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Classes</h3>
                            <p className="text-lg ">Various classes available for students</p>
                        </div>
                        <div className="text-4xl font-bold text-green-600">300+</div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Enrollments</h3>
                            <p className="text-lg ">Over 20,000 students enrolled</p>
                        </div>
                        <div className="text-4xl font-bold text-yellow-600">20,000+</div>
                    </div>
                </div>

                
                <div className="flex justify-center items-center">
                    <img src={statimg} className="w-full h-auto max-h-[400px] rounded-lg shadow-lg" />
                </div>
            </div>
        </section>

    );
};

export default HomeStats;