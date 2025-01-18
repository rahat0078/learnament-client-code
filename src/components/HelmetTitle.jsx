
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line react/prop-types
const HelmetTitle = ({title}) => {
    return (
        <>
            <Helmet>
                <title>
                    {title} - LearnaMent
                </title>
            </Helmet>
        </>
    );
};

export default HelmetTitle;