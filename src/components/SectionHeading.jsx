/* eslint-disable react/prop-types */

const SectionHeading = ({ title, description }) => {
    return (
        <div className="text-center my-6">
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>
            {
                description && <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">{description}</p>
            }
        </div>
    );
};

export default SectionHeading;