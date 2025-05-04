import Lottie from 'lottie-react';
import faqLottie from '../../assets/Lottie/faq-learnament.json';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useContext } from 'react';
import ThemeContext from './../../Provider/ThemeContext';

const Faq = () => {

    const {theme} = useContext(ThemeContext)


    const faqData = [
        {
            "_id": "1254diefdke",
            "question": "What is Learnament?",
            "answer": "Learnament is an innovative platform for students to explore and enroll in top-notch educational courses, designed to enhance their skills and knowledge."
        },
        {
            "_id": "1254didfdfefdke",
            "question": "How do I enroll in a course?",
            "answer": "You can browse our courses, select the one you like, and follow the simple enrollment process to get started."
        },
        {
            "_id": "dfd54diefdke",
            "question": "Are the courses self-paced or live?",
            "answer": "We offer both self-paced and live courses to suit different learning preferences and schedules."
        },
        {
            "_id": "14875diefdke",
            "question": "Can I access the platform on my mobile device?",
            "answer": "Yes, Learnament is fully optimized for mobile devices, so you can learn anytime, anywhere."
        },
        {
            "_id": "dfewfd353edt4",
            "question": "Is there a refund policy for courses?",
            "answer": "No, we currently do not offer refunds for courses. Please make sure to review the course details before enrolling."
        },
        {
            "_id": "1dfefed5583fdke",
            "question": "How can I contact support if I have questions?",
            "answer": "You can reach out to our support team or email us directly for assistance."
        }
    ]



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center container mx-auto gap-4 lg:gap-10 py-8 md:py-10 lg:py-12 xl:py-14">
            <div className='lg:col-span-2'>
                <Accordion allowZeroExpanded={true}>
                    {
                        faqData.map(item => <AccordionItem key={item._id}>
                            <AccordionItemHeading>
                                <AccordionItemButton className={
                                    theme === "dark" ? "px-6 py-4 bg-gray-800" : "px-6 py-4 bg-gray-100"
                                    
                                }>
                                    {item.question}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    {item.answer}
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>)
                    }
                
                </Accordion>
            </div>
            <div className='max-w-md'>
                <Lottie className="w-full" animationData={faqLottie} loop={true} />
            </div>
        </div>
    );
};

export default Faq;