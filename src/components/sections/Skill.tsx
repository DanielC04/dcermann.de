import { useState, useEffect, useRef } from "react";
import { Skill as SkillType } from "../loaded_data_types";
import { Tooltip } from "../utils/Tooltip";

function Skill(props: SkillType) {
  const [isOpened, setIsOpened] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${props.proficiency}%`;
          observer.unobserve(bar);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(bar);
    return () => observer.disconnect();
  }, [props.proficiency]);

  return (
    <div className="skill" onClick={() => setIsOpened(!isOpened)}>
      <span className="fancy-heading"></span>
      <Tooltip text={props.description == '' ? `${props.proficiency}/100` : props.description} cssClass="skill-description">
        <div className="proficiency-indicator">
          <div
            ref={barRef}
            className="bar"
            style={{ width: '0%' }}
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
