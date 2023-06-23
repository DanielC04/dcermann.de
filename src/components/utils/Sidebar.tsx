import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.scss";
import { HashLink } from "react-router-hash-link";

interface Props {
    sectionNames: string[];
}

function Sidebar(props: Props) {
    const [activeSection, setActiveSection] = useState("home");
    const sectionRefs: React.RefObject<Array<HTMLElement | null>> = useRef([]);

    useEffect(() => {
        props.sectionNames.forEach((name: string, i: number) => {
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
    }, []);

    return (
        <div className="sidebar">
            <HashLink to="/#home">
                <img className="logo" src="dc-logo.svg" alt="DANIEL" />
            </HashLink>
            <div>
                {props.sectionNames.map((section: string, id: number) => (
                    <HashLink
                        to={`#${section}`}
                        key={id}
                        className={`section-label ${
                            section === activeSection && "active"
                        }`}
                    >
                        {section}
                    </HashLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
