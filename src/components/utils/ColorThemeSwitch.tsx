import { useEffect, useState } from "react";
import "./ColorThemeSwitch.scss";
import Switch from "react-switch";

function ColorThemeSwitch() {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const newTheme = setTheme(true);
        if (newTheme == "light") setChecked(true);
    }, []);

    return (
        <div className="color-theme-switch">
            <Switch
                checked={checked}
                onChange={() => {
                    setChecked(!checked);
                    setTheme();
                }}
                offColor="blue"
                onColor="red"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                    <span
                        className="iconify unchecked-icon"
                        data-icon="twemoji:owl"
                        data-inline="false"
                    ></span>
                }
                checkedIcon={
                    <span
                        className="iconify checked-icon"
                        data-icon="noto-v1:sun-with-face"
                        data-inline="false"
                    ></span>
                }
                id="icon-switch"
            />
        </div>
    );
}

function setTheme(forFirstTime = false) {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    let newTheme: string | null =
        body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    if (forFirstTime) {
        // try loading previous theme from local storage
        newTheme = window.localStorage.getItem("data-theme");
        if (!newTheme) {
            // load according to prefered color scheme
            newTheme =
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";
        }
    }
    body.setAttribute(dataThemeAttribute, newTheme);
    window.localStorage.setItem("data-theme", newTheme);
    return newTheme;
}

export default ColorThemeSwitch;
