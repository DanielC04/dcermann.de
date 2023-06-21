import { useEffect } from "react";
import "./LanguageSwitch.scss";
import { LangSpecificData, SharedData } from "../loaded_data_types";
import $ from "jquery";

const RETRY_DELAY = 10_000;

interface Props {
    setResumeData: any,
	setSharedData: any,
	setErrorMessage: any,
}

function LanguageSwitch(props: Props) {
    useEffect(() => {
        // load all the text
        loadSharedData(props.setSharedData, props.setErrorMessage);
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            props.setResumeData,
            props.setErrorMessage
        );
    }, []);

    const switchToPrimaryLang = () =>
        applyPickedLanguage(
            (window as any).$primaryLanguage,
            (window as any).$secondaryLanguageIconId,
            props.setResumeData,
            props.setErrorMessage
        );

    const switchToSecondaryLang = () =>
        applyPickedLanguage(
            (window as any).$secondaryLanguage,
            (window as any).$primaryLanguageIconId,
            props.setResumeData,
            props.setErrorMessage
        );

    return (
        <div className="language-container">
            <div className="language">
                <div
                    onClick={switchToPrimaryLang}
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
                    onClick={switchToSecondaryLang}
                    style={{ display: "inline" }}
                >
                    <span
                        className="iconify language-icon"
                        data-icon="twemoji-flag-for-flag-germany"
                        data-inline="false"
                        id={(window as any).$secondaryLanguageIconId}
                    ></span>
                </div>
            </div>
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

function loadResumeFromPath(
    path: string,
    setResumeData: any,
    setErrorMessage: any
) {
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
            setTimeout(
                () => loadSharedData(setSharedData, setErrorMessage),
                RETRY_DELAY
            );
        },
    });
}

export default LanguageSwitch;
