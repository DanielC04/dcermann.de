import "./Projects.scss";
import { Project as ProjectType, BasicInfo } from "../loaded_data_types";
import Project from "./Project";
import { useStaggerReveal } from "../../customHooks/useScrollReveal";
import { lazy, Suspense } from "react";

const DotWaveBg = lazy(() => import("../../Backgrounds/DotWaveBg"));

interface Props {
    projects: Array<ProjectType> | undefined;
    basicInfo: BasicInfo | undefined;
}

function Projects(props: Props) {
    const rowRef = useStaggerReveal<HTMLDivElement>('.project', 100);
    let sectionName, projects;
    if (props.projects && props.basicInfo) {
        sectionName = props.basicInfo.section_name.projects;
        projects = props.projects.map((project: ProjectType, i: number) => (
            <Project key={i} {...project} />
        ));
    }

    return (
        <section id="projects">
            <Suspense fallback={null}><DotWaveBg /></Suspense>
            <div className="projects-content col-sm-12">
                <h2 className="section-title">{sectionName}</h2>
                <div className="container">
                    <div ref={rowRef} className="row g-4 justify-content-center">{projects}</div>
                </div>
            </div>
        </section>
    );
}

export default Projects;
