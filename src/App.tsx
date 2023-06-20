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

function App() {
    const [resumeData, setResumeData] = useState<LangSpecificData  | undefined>();
    const [sharedData, setSharedData] = useState<SharedData | undefined> ();

    useEffect(() => {
        // load all the text
        loadSharedData(setSharedData);
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            setResumeData
        );
    }, []);

    const switchToPrimaryLang = () =>
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            setResumeData
        );

    const switchToSecondaryLang = () =>
        applyPickedLanguage(
            (window as any).$secondaryLanguage,
            (window as any).$primaryLanguageIconId,
            setResumeData
        );
    
    return (
        <div className="app">
            {/* <BackgroundAnimation /> */}
            <Home
                sharedData={sharedData?.basic_info}
                switchToPrimaryLang={switchToPrimaryLang}
                switchToSecondaryLang={switchToSecondaryLang}
            />
            <About
                resumeBasicInfo={resumeData?.basic_info}
                sharedBasicInfo={sharedData?.basic_info}
            />
            <Projects
                resumeProjects={resumeData?.projects}
                resumeBasicInfo={resumeData?.basic_info}
            />
            <Skills
                sharedSkills={sharedData?.skills}
                resumeBasicInfo={resumeData?.basic_info}
            />
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
    setResumeData: any
) {
    swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    const resumePath =
        document.documentElement.lang === (window as any).$primaryLanguage
            ? `res_primaryLanguage.json`
            : `res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath, setResumeData);
}

function swapCurrentlyActiveLanguage(oppositeLangIconId:any) {
    const pickedLangIconId =
        oppositeLangIconId === (window as any).$primaryLanguageIconId
            ? (window as any).$secondaryLanguageIconId
            : (window as any).$primaryLanguageIconId;
    document.getElementById(oppositeLangIconId)!.classList.remove("active");
    document.getElementById(pickedLangIconId)!.classList.add("active");
}

function loadResumeFromPath(path: string, setResumeData:any) {
    $.ajax({
        url: path,
        dataType: "json",
        cache: false,
        success: (data: LangSpecificData) => {
            setResumeData(data);
        },
        error: () => {
            alert("connection to server failed :(");
        },
    });
}

function loadSharedData(setSharedData:any) {
    $.ajax({
        url: `portfolio_shared_data.json`,
        dataType: "json",
        cache: false,
        success: function (data: SharedData) {
            setSharedData(data);
            document.title = `${data.basic_info.name}`;
        },
        error: () => {
            alert("connection to server failed :(");
        },
    });
}

export default App;
