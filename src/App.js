import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";



function App() {
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});
  const [currSectionId, setVisibleSectionId] = useState('about');

  useEffect(() => {
    // load all the text
    loadSharedData(setSharedData);
    applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId,
      setResumeData
    );
    // set observer that checks what section is active
    window.addEventListener('scroll', (event) => {
      document.querySelectorAll("section").forEach(((e) => {
        if (e.getBoundingClientRect().top < 75) {
          let t = e.attributes.id.value;
          setVisibleSectionId(t);
        }
      }))
    });
  }, [])

  return (
    <div>
      <Header sharedData={sharedData.basic_info} />
      <div className="language-container">
        <div className="language">
          <div
            onClick={() =>
              applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId,
                setResumeData
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-germany"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
      </div>
      <About
        resumeBasicInfo={resumeData.basic_info}
        sharedBasicInfo={sharedData.basic_info}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Skills
        sharedSkills={sharedData.skills}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Experience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Footer sharedBasicInfo={sharedData.basic_info} />
    </div>
  );
}

function applyPickedLanguage(pickedLanguage, oppositeLangIconId, setResumeData) {
  swapCurrentlyActiveLanguage(oppositeLangIconId);
  document.documentElement.lang = pickedLanguage;
  var resumePath =
    document.documentElement.lang === window.$primaryLanguage
      ? `res_primaryLanguage.json`
      : `res_secondaryLanguage.json`;
  loadResumeFromPath(resumePath, setResumeData);
}

function swapCurrentlyActiveLanguage(oppositeLangIconId) {
  var pickedLangIconId =
    oppositeLangIconId === window.$primaryLanguageIconId
      ? window.$secondaryLanguageIconId
      : window.$primaryLanguageIconId;
  document
    .getElementById(oppositeLangIconId)
    .removeAttribute("filter", "brightness(35%)");
  document
    .getElementById(pickedLangIconId)
    .setAttribute("filter", "brightness(35%)");
}

function loadResumeFromPath(path, setResumeData) {
  $.ajax({
    url: path,
    dataType: "json",
    cache: false,
    success: function (data) {
      setResumeData(data);
    },
    error: function (xhr, status, err) {
      alert(err);
    },
  });
}

function loadSharedData(setSharedData) {
  $.ajax({
    url: `portfolio_shared_data.json`,
    dataType: "json",
    cache: false,
    success: function (data) {
      setSharedData(data);
      document.title = `${data.basic_info.name}`;
    },
    error: function (xhr, status, err) {
      alert(err);
    },
  });
}

export default App;