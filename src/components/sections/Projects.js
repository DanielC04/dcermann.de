import React, { useState } from "react";
import './Projects.scss';

function Projects(props) {
  let sectionName, projects;
  if (props.resumeProjects && props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.projects;
    projects = props.resumeProjects.map((project, i) => <Project key={i} data={project} />);
  };

  return (
    <section id="projects">
      <div className="col-sm-12">
        <h1 className="section-title">
          <span>{sectionName}</span>
        </h1>
        <div className="col-sm-12 row projects-container">
          {projects}
        </div>
      </div>
    </section>
  );
}


function Project(props) {
  return (
    <div className="project col-sm-12 col-md-6 col-lg-5 mx-auto" key={props.data.title}>
      <span className="fancy-title">
        {props.data.title}
      </span>
      <div className="content center">
        <div className='image-container'>
          <img src="/images/laptop_blank.svg" alt={props.data.title} className='laptop' />
          <img src={props.data.images[0]} alt={props.data.title} className='screen' />
        </div>
        <div className="description">
          {props.data.description}
        </div>
      </div>
    </div>);
}


export default Projects;