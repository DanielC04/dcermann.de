import { useEffect, useState } from "react";
import "./LanguageSwitch.scss";

import sharedData from '../../assets/text/shared_data.json';
import resumeDataEnglish from '../../assets/text/data_english.json';
import resumeDataGerman from '../../assets/text/data_german.json';

type LanguageType = "german" | "english" | "spanish";

interface Props {
    setResumeData: any;
    setSharedData: any;
    setErrorMessage: any;
}

function LanguageSwitch(props: Props) {
    const [language, setLanguageVar] = useState("english");

    const setLanguage = (language: LanguageType) => {
        setLanguageVar(language);
        storeLanguageSetting(language);
        const newData = language == 'english' ? resumeDataEnglish : resumeDataGerman;
        props.setResumeData(newData);
    };

    useEffect(() => {
        // load all the text
        props.setSharedData(sharedData);
        const defaultLanguage = getDefaultLanguage();
        setLanguage(defaultLanguage);
    }, []);

    return (
        <div className="language-container">
            <div className="language">
                <div onClick={() => setLanguage("english")} className={`flag-container ${language == 'english' ? 'active': ''}`}>
                    <span
                        className={'iconify language-icon'}
                        data-icon="twemoji-flag-for-flag-united-kingdom"
                        data-inline="false"
                    ></span>
                </div>
                <div onClick={() => setLanguage("german")} className={`flag-container ${language == 'german' ? 'active': ''}`}>
                    <span
                        className={'iconify language-icon'}
                        data-icon="twemoji-flag-for-flag-germany"
                        data-inline="false"
                    ></span>
                </div>
            </div>
        </div>
    );
}

function storeLanguageSetting(language: LanguageType) {
    window.localStorage.setItem("language", language);
}

function getDefaultLanguage(): LanguageType {
    const lang = window.localStorage.getItem("language") as LanguageType;
    if (lang) return lang;
    return "english";
}

export default LanguageSwitch;
