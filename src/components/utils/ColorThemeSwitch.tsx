import { useEffect, useState } from "react";
import "./ColorThemeSwitch.scss";

type ThemeType = "light" | "dark";

function ColorThemeSwitch() {
    const [theme, setThemeState] = useState(getStartTheme());

    useEffect(() => {
        const startTheme = getStartTheme();
        setTheme(startTheme);
        setThemeState(startTheme)
    }, []);

    const toggleTheme = () => {
        const newTheme: ThemeType = theme == 'dark' ? "light" : "dark";
        setThemeState(newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="color-theme-switch">
            <input
                type="checkbox"
                className="dn"
                id="dn"
                defaultChecked={theme == 'dark'}
                onChange={toggleTheme}
            />
            <label htmlFor="dn" className="toggle">
                <span className="toggle__handler">
                    <span className="crater crater--1"></span>
                    <span className="crater crater--2"></span>
                    <span className="crater crater--3"></span>
                </span>
                <span className="star star--1"></span>
                <span className="star star--2"></span>
                <span className="star star--3"></span>
                <span className="star star--4"></span>
                <span className="star star--5"></span>
                <span className="star star--6"></span>
            </label>
        </div>
    );
}

function getStartTheme(): ThemeType {
    // try loading previous theme from local storage
    let newTheme = window.localStorage.getItem("data-theme") as ThemeType;
    if (!newTheme) {
        // load according to prefered color scheme
        newTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
    }

    return newTheme;
}

function setTheme(newTheme: ThemeType) {
    const dataThemeAttribute = "data-theme";
    document.body.setAttribute(dataThemeAttribute, newTheme);
    window.localStorage.setItem("data-theme", newTheme);
}

export default ColorThemeSwitch;
