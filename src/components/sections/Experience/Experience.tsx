import "./Experience.scss";
import {
    BasicInfo,
    Experience as ExperienceType,
} from "../../loaded_data_types";
import TimelineBox from "./TimelineBox";

interface Props {
    experiences: ExperienceType[] | undefined;
    basicInfo: BasicInfo | undefined;
}

function Experience(props: Props) {
    let sectionName = "";
    let experiences;
    if (props.basicInfo) {
        sectionName = props.basicInfo.section_name.experience;
        experiences = props.experiences?.map((experience_data, i: number) => (
            <TimelineBox {...experience_data} side={i % 2 === 0 ? 'left' : 'right'} key={i} />
        ));
    }

    return (
        <section id="experience">
            <h2>{sectionName}</h2>
            <div className="container">
                <div className="col-sm-12 mx-auto">
                    <div className="timeline">
                        {experiences}
                        <div className="arrow-head"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;
