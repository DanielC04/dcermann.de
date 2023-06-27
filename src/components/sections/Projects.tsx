import "./Projects.scss";
import { Project as ProjectType, BasicInfo } from "../loaded_data_types";
import Project from "./Project";

interface Props {
    projects: Array<ProjectType> | undefined;
    basicInfo: BasicInfo | undefined;
}

function Projects(props: Props) {
    let sectionName, projects;
    if (props.projects && props.basicInfo) {
        sectionName = props.basicInfo.section_name.projects;
        projects = props.projects.map((project: ProjectType, i: number) => (
            <Project key={i} {...project} />
        ));
    }

    return (
        <section id="projects">
            <div className="col-sm-12">
                <h2 className="section-title">{sectionName}</h2>
                <div className="container">
                    <div className="row g-6">{projects}</div>
                </div>
            </div>
        </section>
    );
}

export default Projects;
