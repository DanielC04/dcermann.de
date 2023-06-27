import "./Experience.scss";
import { BasicInfo } from "../loaded_data_types";

interface Props {
    basicInfo: BasicInfo | undefined;
}

function experience(props: Props) {
    let sectionName = "";
    if (props.basicInfo) {
        sectionName = props.basicInfo.section_name.experience;
    }

    return (
        <section id="experience">
            <h2>{sectionName}</h2>
            <div className="container">
                <div className="col-sm-12 mx-auto">
                    <div className="timeline">
                        <div className="content-box">
                            <h3>Lorem, ipsum dolor sit!</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, inventore ab asperiores saepe et dolorum vero ipsa! Labore reprehenderit facilis libero, vero illo id qui corrupti quas voluptas ratione! Quam?
                            </p>
                        </div>
                        <div className="content-box">

                        </div>
                        <div className="arrow-head"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default experience;
