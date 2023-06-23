import { useState } from "react";
import { Skill as SkillType } from "../loaded_data_types";

function Skill(props: SkillType) {
    const [isOpened, setIsOpened] = useState(true);
    return (
        <div className="skill" onClick={() => setIsOpened(!isOpened)}>
            <span className="fancy-heading"></span>
            <div className="proficiency-indicator">
                <div
                    className="bar"
                    title={`${props.proficiency}%`}
                    style={{ width: `${props.proficiency}%` }}
                >
                    <span className="name">{props.name}</span>
                    <i className={`${props.icon} skill-icon`}></i>
                </div>
            </div>
        </div>
    );
}

export default Skill;
