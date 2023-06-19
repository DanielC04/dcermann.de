import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./App.scss";
import Footer from "./components/utils/Footer";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components//sections/Projects";
import Skills from "./components//sections/Skills";
import Sidebar from "./components/utils/Sidebar";
// import BackgroundAnimation from "./THREEJS/BackgroundAnimation";
import MatrixRain from "./Backgrounds/MatrixRain/MatrixRain";


function App() {
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});

  useEffect(() => {
    // load all the text
    loadSharedData(setSharedData);
    applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId,
      setResumeData
    );
  }, [])

  const switchToPrimaryLang = () => applyPickedLanguage(
    window.$primaryLanguage,
    window.$secondaryLanguageIconId,
    setResumeData
  )

  const switchToSecondaryLang = () => applyPickedLanguage(
    window.$secondaryLanguage,
    window.$primaryLanguageIconId,
    setResumeData
  )

  return (
    <div className="app">
      {/* <BackgroundAnimation /> */}
      <MatrixRain />
      <Home sharedData={sharedData.basic_info} switchToPrimaryLang={switchToPrimaryLang} switchToSecondaryLang={switchToSecondaryLang} />
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
      <Sidebar sections={['home', 'about', 'projects', 'skills', 'experience', 'contact']} />
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
      alert("connection to server failed :(", err);
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