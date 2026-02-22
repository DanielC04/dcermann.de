import './About.scss';
import { calculateAge } from '../../utils/utils';
import { useScrollReveal } from '../../../customHooks/useScrollReveal';

function About(props: any) {
  const photoRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>();
  let profilepic, sectionName, hello, about;
  if (props.sharedBasicInfo) {
    profilepic = "images/" + props.sharedBasicInfo.image;
  }
  if (props.resumeBasicInfo) {
    sectionName = props.resumeBasicInfo.section_name.about;
    hello = props.resumeBasicInfo.description_header;
    const currentAge = calculateAge("2004-06-06");
    about = props.resumeBasicInfo.description.replace("{{AGE}}", currentAge.toString());
  }

  return (
    <section id="about" className='grid-overlay'>
      <div className="col-md-12">
        <h2>
          <span>{sectionName}</span>
        </h2>
        <div className="container row center mx-auto">
          <div ref={photoRef} className="col-md-4 mb-5 center reveal-left">
            <div className="polaroid">
              <span>
                <img
                  height="250px"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
              </span>
            </div>
          </div>

          <div ref={cardRef} className="col-md-8 center reveal-right" style={{ transitionDelay: '0.12s' }}>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <span className="wave">{hello} :) </span>
                  <br />
                  <span className="introduction" dangerouslySetInnerHTML={{ __html: about }}>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
