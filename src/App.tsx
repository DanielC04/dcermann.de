import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import "./App.scss";
import { LangTranslations, SharedData } from "./components/loaded_data_types";
import LoaderPage from "./components/utils/LoaderPage";
import sharedDataRaw from "./assets/text/shared_data.json";
import { mergeData } from "./mergeData";

const sharedData = sharedDataRaw as unknown as SharedData;

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
    const { i18n } = useTranslation();
    const langBundle = i18n.getResourceBundle(i18n.resolvedLanguage ?? 'en', "translation") as LangTranslations | undefined;
    const resumeData = langBundle ? mergeData(langBundle, sharedData) : undefined;

    return (
        <div className="app">
            <Suspense fallback={<LoaderPage />}>
                <LanguageSwitch />
                <Home sharedData={sharedData.basic_info} />
                <>
                    <About
                        resumeBasicInfo={resumeData?.basic_info}
                        sharedBasicInfo={sharedData.basic_info}
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
                <Sidebar sectionNames={resumeData?.basic_info.section_name} />
                <Footer sharedBasicInfo={sharedData.basic_info} />
            </Suspense>
        </div>
    );
}

export default App;
