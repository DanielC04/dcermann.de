import { useState, lazy, Suspense } from "react";
import "./App.scss";
import { LangSpecificData, SharedData } from "./components/loaded_data_types";
import Loader from "./components/utils/Loader";

const Home = lazy(() => import("./components/sections/Home"));
const About = lazy(() => import("./components/sections/About/About"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Experience = lazy(() => import("./components/sections/Experience/Experience"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Sidebar = lazy(() => import("./components/utils/Sidebar"));
const Footer = lazy(() => import("./components/utils/Footer"));
const LanguageSwitch = lazy(() => import("./components/utils/LanguageSwitch"));

function App() {
    const [resumeData, setResumeData] = useState<
        LangSpecificData | undefined
    >();
    const [sharedData, setSharedData] = useState<SharedData | undefined>();
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="app">
            <Suspense fallback={<Loader />}>
                <LanguageSwitch
                    setErrorMessage={setErrorMessage}
                    setResumeData={setResumeData}
                    setSharedData={setSharedData}
                />
                <Home sharedData={sharedData?.basic_info} />
                {errorMessage !== "" ? (
                    <section id="error-message">
                        <h2 className="error-message">{errorMessage}</h2>
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
                        <Experience experiences={resumeData?.experience} basicInfo={resumeData?.basic_info} />
                        <Contact basicInfo={resumeData?.basic_info} />
                    </>
                )}
                <Sidebar
                    sectionNames={[
                        "home",
                        "about",
                        "projects",
                        "skills",
                        "experience",
                        "contact",
                    ]}
                />
                <Footer sharedBasicInfo={sharedData?.basic_info} />
            </Suspense>
        </div>
    );
}

export default App;
