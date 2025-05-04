/* eslint-disable react/prop-types */

const SectionHeading = ({ title, description }) => {
    return (
        <div className="text-center mb-4">
            <h2 className="text-3xl font-semibold mb-2">{title}</h2>
            {
                description && <p className="text-gray-400 max-w-4xl mx-auto">{description}</p>
            }
        </div>
    );
};

export default SectionHeading;