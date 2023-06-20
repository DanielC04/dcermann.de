import { useEffect, useState } from "react";
import $ from "jquery";
import "./App.scss";
import Footer from "./components/utils/Footer";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Sidebar from "./components/utils/Sidebar";
// import BackgroundAnimation from "./Backgrounds/BackgroundAnimation";
import { LangSpecificData, SharedData } from "./components/loaded_data_types";

const RETRY_DELAY = 10_000;

function App() {
    const [resumeData, setResumeData] = useState<
        LangSpecificData | undefined
    >();
    const [sharedData, setSharedData] = useState<SharedData | undefined>();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // load all the text
        loadSharedData(setSharedData, setErrorMessage);
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            setResumeData,
            setErrorMessage
        );
    }, []);

    const switchToPrimaryLang = () =>
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            setResumeData,
            setErrorMessage
        );

    const switchToSecondaryLang = () =>
        applyPickedLanguage(
            (window as any).$secondaryLanguage,
            (window as any).$primaryLanguageIconId,
            setResumeData,
            setErrorMessage
        );

    return (
        <div className="app">
            {/* <BackgroundAnimation /> */}
            <Home
                sharedData={sharedData?.basic_info}
                switchToPrimaryLang={switchToPrimaryLang}
                switchToSecondaryLang={switchToSecondaryLang}
            />
            {errorMessage !== "" ? (
                <section id="error-message">
                    <h1 className="error-message">{errorMessage}</h1>
                </section>
            ) : (
                <>
                    <About
                        resumeBasicInfo={resumeData?.basic_info}
                        sharedBasicInfo={sharedData?.basic_info}
                    />
                    <Projects
                        projects={resumeData?.projects}
                        basicInfo={resumeData?.basic_info}
                    />
                    <Skills
                        sharedSkills={sharedData?.skills}
                        resumeBasicInfo={resumeData?.basic_info}
                    />
                </>
            )}
            <Sidebar
                sections={[
                    "home",
                    "about",
                    "projects",
                    "skills",
                    "experience",
                    "contact",
                ]}
            />
            <Footer sharedBasicInfo={sharedData?.basic_info} />
        </div>
    );
}

function applyPickedLanguage(
    pickedLanguage: any,
    oppositeLangIconId: any,
    setResumeData: any,
    setErrorMessage: any
) {
    swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    const resumePath =
        document.documentElement.lang === (window as any).$primaryLanguage
            ? `res_primaryLanguage.json`
            : `res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath, setResumeData, setErrorMessage);
}

function swapCurrentlyActiveLanguage(oppositeLangIconId: any) {
    const pickedLangIconId =
        oppositeLangIconId === (window as any).$primaryLanguageIconId
            ? (window as any).$secondaryLanguageIconId
            : (window as any).$primaryLanguageIconId;
    document.getElementById(oppositeLangIconId)?.classList.remove("active");
    document.getElementById(pickedLangIconId)?.classList.add("active");
}

function loadResumeFromPath(path: string, setResumeData: any, setErrorMessage: any) {
    $.ajax({
        url: path,
        dataType: "json",
        cache: false,
        success: (data: LangSpecificData) => {
            setResumeData(data);
        },
        error: () => {
            console.error("connection to server failed :(");
            setErrorMessage("connection to server failed :(");
            setTimeout(
                () => loadResumeFromPath(path, setResumeData, setErrorMessage),
                RETRY_DELAY
            );
        },
    });
}

function loadSharedData(setSharedData: any, setErrorMessage: any) {
    $.ajax({
        url: `portfolio_shared_data.json`,
        dataType: "json",
        cache: false,
        success: function (data: SharedData) {
            setSharedData(data);
            document.title = `${data.basic_info.name}`;
        },
        error: () => {
            console.error("connection to server failed :(");
            setErrorMessage("connection to server failed :(");
            setTimeout(() => loadSharedData(setSharedData, setErrorMessage), RETRY_DELAY);
        },
    });
}

export default App;
