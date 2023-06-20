import { Project as ProjectData } from "../loaded_data_types";
function Project(props: ProjectData) {
    return (
        <div
            className="project col-sm-12 col-md-6 mx-auto p-3"
            key={props.title}
        >
            <span className="fancy-title">{props.title}</span>
            {/* <div className="row"> */}
            <div>
                <div className="image-container">
                    <img
                        src={props.images[0]}
                        alt={props.title}
                        className="screen"
                    />
                    <img
                        src="/images/laptop_blank_bottom.svg"
                        alt={props.title}
                        className="laptop"
                    />
                </div>
                <p className="description">{props.description}</p>
                {/* </div> */}
            </div>
        </div>
    );
}

export default Project;
