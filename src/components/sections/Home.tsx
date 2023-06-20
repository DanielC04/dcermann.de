import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Switch from "react-switch";
import MatrixRain from "../../Backgrounds/MatrixRain/MatrixRain.tsx";
import "./Home.scss";

function Home(props: any) {
    let titles: Array<string> = [];
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [checked, setChecked] = useState(false);

    if (props.sharedData) {
        titles = props.sharedData.titles
            .map((x: string) => [x.toUpperCase(), 1500])
            .flat();
    }

    useEffect(() => {
        setPageHeight(window.innerHeight);
        setTheme(true);

        window.addEventListener("resize", () =>
            setPageHeight(window.innerHeight)
        );
    }, []);

    const HeaderTitleTypeAnimation = React.memo(
        () => {
            return (
                <TypeAnimation
                    className="title-styles"
                    sequence={titles}
                    repeat={500}
                />
            );
        },
        () => true
    );

    return (
        <section id="home" style={{ minHeight: pageHeight }}>
            <MatrixRain />
            <div className="row aligner">
                <div>
                    <span
                        className="iconify header-icon"
                        data-icon="la:laptop-code"
                        data-inline="false"
                    ></span>
                    <br />
                    <h1 className="mb-0">
                        {/* <Typical steps={[name]} wrapper="p" /> */}
                        <TypeAnimation
                            sequence={["Daniel Cermann"]}
                            wrapper="span"
                        />
                    </h1>
                    <div className="title-container">
                        <HeaderTitleTypeAnimation />
                    </div>
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
                    <div className="language-container">
                        <div className="language">
                            <div
                                onClick={props.switchToPrimaryLang}
                                style={{ display: "inline" }}
                            >
                                <span
                                    className="iconify language-icon mr-5"
                                    data-icon="twemoji-flag-for-flag-united-kingdom"
                                    data-inline="false"
                                    id={(window as any).$primaryLanguageIconId}
                                ></span>
                            </div>
                            <div
                                onClick={props.switchToSecondaryLang}
                                style={{ display: "inline" }}
                            >
                                <span
                                    className="iconify language-icon"
                                    data-icon="twemoji-flag-for-flag-germany"
                                    data-inline="false"
                                    id={
                                        (window as any).$secondaryLanguageIconId
                                    }
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function setTheme(forFirstTime = false) {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    let newTheme =
        body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    if (forFirstTime) {
        newTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
    }
    body.setAttribute(dataThemeAttribute, newTheme);
}

export default Home;
