import { useEffect, useState } from "react";
import ThemeContext from './ThemeContext';

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme); // Optional: Apply theme to <html>
    }, [theme]);


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;