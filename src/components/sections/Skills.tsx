import { lazy, Suspense } from "react";
import {
    BasicInfo,
    SkillCategory as SkillCategoryType,
    Skills as SkillsType,
} from "../loaded_data_types";
import SkillCategory from "./SkillCategory";
import "./Skills.scss";
import { useStaggerReveal } from "../../customHooks/useScrollReveal";

const TechScene = lazy(() => import("./TechScene"));

interface Props {
    basicInfo: BasicInfo | undefined;
    skills: SkillsType | undefined;
}

function Skills(props: Props) {
    const gridRef = useStaggerReveal<HTMLDivElement>('.skill-category', 120);
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
            <Suspense fallback={null}>
                <TechScene />
            </Suspense>
            <div className="skills-content">
                <h2>{sectionName}</h2>
                <div className="col-md-12">
                    <div className="container text-center">
                        <div ref={gridRef} className="row justify-content-center">
                            {skillCategories}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
