import { Skill as SkillType } from "../loaded_data_types";

function Skill(props: SkillType) {
    return (
        <div className="skill">
            <span className="fancy-heading"></span>
            <div className="proficiency-indicator">
                <div className="bar" title={props.description} style={{ width: `${props.proficiency}%` }}>
                    <span>{props.name}</span>
                    <i className={`${props.icon} skill-icon`}></i>
                </div>
            </div>
        </div>
    );
}

export default Skill;
