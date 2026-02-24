import { lazy, Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.scss";
import { LangTranslations, SharedData } from "./components/loaded_data_types";
import LoaderPage from "./components/utils/LoaderPage";
import sharedDataRaw from "./assets/text/shared_data.json";
import { mergeData } from "./mergeData";
import ColorThemeSwitch from "./components/utils/ColorThemeSwitch";

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
const CustomCursor = lazy(() => import("./components/utils/CustomCursor"));

function App() {
    const { i18n } = useTranslation();
    const langBundle = i18n.getResourceBundle(i18n.resolvedLanguage ?? 'en', "translation") as LangTranslations | undefined;
    const resumeData = langBundle ? mergeData(langBundle, sharedData) : undefined;

    const [inHero, setInHero] = useState(() => window.scrollY < window.innerHeight * 0.5);
    useEffect(() => {
        const onScroll = () => setInHero(window.scrollY < window.innerHeight * 0.2);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="app">
            <div className={`theme-switch-dock${inHero ? '' : ' docked'}`}>
                <ColorThemeSwitch />
            </div>
            <Suspense fallback={<LoaderPage />}>
                <CustomCursor />
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
