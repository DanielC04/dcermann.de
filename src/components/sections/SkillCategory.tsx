import {
    SkillCategory as SkillCategoryType,
    Skill as SkillType,
} from "../loaded_data_types";
import Skill from "./Skill";

function SkillCategory(props: SkillCategoryType) {
    console.log(props);
    return (
        <div className="skill-category col-lg-4 col-md-6 col-sm-12">
            <span className="fancy-title">{props.name}</span>
            {props.data.map((skill: SkillType, i: number) => (
                <Skill key={i} {...skill} />
            ))}
        </div>
    );
}

export default SkillCategory;
