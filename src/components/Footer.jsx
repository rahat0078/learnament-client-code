import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {

    const [inputValue, setInputValue] = useState("")

    const handleSubscribe = () => {
        if (inputValue) {
            toast.success("Thank's for your response")
            setInputValue('')
        }
        else {
            toast.error("Cant't find your contact")
        }

    }


    return (
        <footer className="footer bg-base-200 text-base-content px-10 py-16 justify-center gap-12 sm:gap-16 md:gap-28 lg:gap-44">
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your Contact Info</span>
                        </label>
                        <div className="join">
                            <input
                                onChange={e => {
                                    const value = e.target.value;
                                    setInputValue(value);
                                }}
                                value={inputValue}
                                type="text"
                                placeholder="email/what's app"
                                className="input input-bordered join-item" />
                            <a onClick={handleSubscribe} className="btn-primary join-item">Subscribe</a>
                        </div>
                    </fieldset>
                </form>
        </footer>
    );
};

export default Footer;