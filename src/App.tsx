import { useState } from "react";
import "./App.scss";
import Footer from "./components/utils/Footer";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Sidebar from "./components/utils/Sidebar";
import { LangSpecificData, SharedData } from "./components/loaded_data_types";
import LanguageSwitch from "./components/utils/LanguageSwitch";
import Contact from "./components/sections/Contact";

function App() {
    const [resumeData, setResumeData] = useState<
        LangSpecificData | undefined
    >();
    const [sharedData, setSharedData] = useState<SharedData | undefined>();
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="app">
            <LanguageSwitch
                setErrorMessage={setErrorMessage}
                setResumeData={setResumeData}
                setSharedData={setSharedData}
            />
            <Home sharedData={sharedData?.basic_info} />
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
                        skills={resumeData?.skills}
                        basicInfo={resumeData?.basic_info}
                    />
                    <Contact basicInfo={resumeData?.basic_info} />
                </>
            )}
            <Sidebar
                sectionNames={[
                    "home",
                    "about",
                    "projects",
                    "skills",
                    "contact",
                ]}
            />
            <Footer sharedBasicInfo={sharedData?.basic_info} />
        </div>
    );
}

export default App;
