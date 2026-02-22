import { Experience } from "../../loaded_data_types";
import { useScrollReveal } from "../../../customHooks/useScrollReveal";

interface Props extends Experience {
    side: 'left' | 'right';
}

function TimelineBox(props: Props) {
    const ref = useScrollReveal<HTMLDivElement>();

    return (
        <div ref={ref} className={`experience-item reveal reveal-${props.side}`}>
            <div className="content-box">
                <h3>
                    {props.title}{" "}
                    {props.logo_path !== "" && (
                        <img src={props.logo_path} />
                    )}
                </h3>
                <div className="years">{props.years}</div>
                <div>{props.description}</div>
            </div>
        </div>
    );
}

export default TimelineBox;
