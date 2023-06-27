import {
    BasicInfo,
    SkillCategory as SkillCategoryType,
    Skills as SkillsType,
} from "../loaded_data_types";
import SkillCategory from "./SkillCategory";
import "./Skills.scss";

interface Props {
    basicInfo: BasicInfo | undefined;
    skills: SkillsType | undefined;
}

function Skills(props: Props) {
    let sectionName, skillCategories;
    if (props.skills && props.basicInfo) {
        sectionName = props.basicInfo.section_name.skills;
        skillCategories = props.skills.map(
            (skillCategory: SkillCategoryType, i: number) => (
                <SkillCategory {...skillCategory} key={i} />
            )
        );
    }
    return (
        <section id="skills">
            <h2>{sectionName}</h2>
            <div className="col-md-12">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        {skillCategories}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
