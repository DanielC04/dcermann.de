import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.scss";
import { HashLink } from "react-router-hash-link";
import { SectionName as SectionNameType } from "../loaded_data_types";

interface Props {
    sectionNames: SectionNameType | undefined;
}

function Sidebar(props: Props) {
    const [activeSection, setActiveSection] = useState("home");
    const sectionRefs: React.RefObject<Array<HTMLElement | null>> = useRef([]);

    useEffect(() => {
        if (!props.sectionNames) return;
        Object.keys(props.sectionNames).forEach((name: string, i: number) => {
            if (sectionRefs.current == null) return;
            sectionRefs.current[i] = document.querySelector(`#${name}`);
        });

        // set observer that checks what section is active
        window.addEventListener("scroll", () => {
            let minDist = Infinity;
            let currSection = "home";
            if (sectionRefs.current == null) return;
            for (const e of sectionRefs.current) {
                if (e == null) continue;
                const dims = e.getBoundingClientRect();
                if (Math.abs(dims.top) < minDist) {
                    currSection = (e.attributes as any).id.value;
                    minDist = Math.abs(dims.top);
                }
            }
            setActiveSection(currSection);
        });
    }, [props.sectionNames]);

    return (
        <div className="sidebar">
            <HashLink to="/#home" className="logo">
                <img src="dc-logo.svg" alt="DANIEL" />
            </HashLink>
            <div className="link-container active">
                {Object.keys(props.sectionNames || {}).map((section_id: string, id: number) => (
                    <HashLink
                        to={`#${section_id}`}
                        key={id}
                        className={`section-label ${
                            section_id === activeSection && "active"
                        }`}
                    >
                        {(props.sectionNames as any)[section_id].toLowerCase()}
                        {/* {section_id} */}
                    </HashLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
