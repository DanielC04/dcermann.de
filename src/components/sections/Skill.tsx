import { useState } from "react";
import { Skill as SkillType } from "../loaded_data_types";
import { Tooltip } from "../utils/Tooltip";

function Skill(props: SkillType) {
  const [isOpened, setIsOpened] = useState(true);
  return (
    <div className="skill" onClick={() => setIsOpened(!isOpened)}>
      <span className="fancy-heading"></span>
      <Tooltip text={props.description == '' ? `${props.proficiency}/100` : props.description} cssClass="skill-description">
        <div className="proficiency-indicator">
          <div
            className="bar"
            style={{ width: `${props.proficiency}%` }}
          >
            <span className="name">{props.name}</span>
            <i className={`${props.icon} skill-icon`}></i>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default Skill;
