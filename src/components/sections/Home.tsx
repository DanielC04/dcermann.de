import { TypeAnimation } from "react-type-animation";
import MatrixRain from "../../Backgrounds/MatrixRain/MatrixRain.tsx";
import "./Home.scss";
import React, { useState, useEffect } from "react";
import ColorThemeSwitch from "../utils/ColorThemeSwitch.tsx";

function Home(props: any) {
    let titles: Array<string> = [];
    const [pageHeight, setPageHeight] = useState(window.innerHeight);

    if (props.sharedData) {
        titles = props.sharedData.titles
            .map((x: string) => [x.toUpperCase(), 1500])
            .flat();
    }

    useEffect(() => {
        setPageHeight(window.innerHeight);

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
        <>
            <section id="home" style={{ height: pageHeight }}>
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
                            <TypeAnimation
                                sequence={["Daniel Cermann"]}
                                wrapper="span"
                            />
                        </h1>
                        <div className="title-container">
                            <HeaderTitleTypeAnimation />
                        </div>
                        <ColorThemeSwitch />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
