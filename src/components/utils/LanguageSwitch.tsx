import { useTranslation } from "react-i18next";
import "./LanguageSwitch.scss";

function LanguageSwitch() {
    const { i18n } = useTranslation();
    const language = i18n.resolvedLanguage;

    return (
        <div className="language-container">
            <div className="language">
                <div
                    onClick={() => i18n.changeLanguage("en")}
                    className={`flag-container ${language === "en" ? "active" : ""}`}
                >
                    <span
                        className={"iconify language-icon"}
                        data-icon="twemoji-flag-for-flag-united-kingdom"
                        data-inline="false"
                    ></span>
                </div>
                <div
                    onClick={() => i18n.changeLanguage("de")}
                    className={`flag-container ${language === "de" ? "active" : ""}`}
                >
                    <span
                        className={"iconify language-icon"}
                        data-icon="twemoji-flag-for-flag-germany"
                        data-inline="false"
                    ></span>
                </div>
            </div>
        </div>
    );
}

export default LanguageSwitch;
