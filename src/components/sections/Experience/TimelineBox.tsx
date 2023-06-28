import { Experience } from "../../loaded_data_types";

function TimelineBox(props: Experience) {
    return (
        <>
            <div className="experience-item">
                <div className="content-box">
                    <h3>{props.title}</h3>
                    <div>{props.description}</div>
                </div>
            </div>
        </>
    );
}

export default TimelineBox;
