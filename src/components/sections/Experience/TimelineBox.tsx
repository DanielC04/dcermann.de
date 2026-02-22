import { Experience } from "../../loaded_data_types";

function TimelineBox(props: Experience) {
    return (
        <>
            <div className="experience-item">
                <div className="content-box">
                    <h3>
                        {props.title}{" "}
                        {props.logo_path !== "" && (
                            <img src={props.logo_path} />
                        )}{" "}
                    </h3>
                    <div className="years">{props.years}</div>
                    <div>{props.description}</div>
                </div>
            </div>
        </>
    );
}

export default TimelineBox;
