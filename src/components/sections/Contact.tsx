import "./Contact.scss";
import { BasicInfo } from "../loaded_data_types";

interface Props {
    basicInfo: BasicInfo | undefined;
}

function Contact(props: Props) {
    const title = props.basicInfo?.section_name.contact;

    return (
        <section id="contact">
            <h1>{title}</h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-7 col-lg-5 justify-content-center">
                        <div className="login-box">
                            <form>
                                <div className="user-box">
                                    <input type="text" name="" className="input" required />
                                    <label>Name</label>
                                </div>
                                <div className="user-box">
                                    <input type="textx" name="" className="input" required />
                                    <label>Email</label>
                                </div>
                                <div className="user-box">
                                    <textarea className="input">
                                    </textarea>
                                    {/* <input type="" name="" required /> */}
                                    <label>Message</label>
                                </div>
                                <center>
                                    <a href="#">
                                        <i
                                            className={`devicon-line-plain icon`}
                                        ></i>
                                        &gt; <span style={{marginLeft: '-14px'}}>_</span> SEND
                                        <span className="animation"></span>
                                    </a>
                                </center>
                            </form>
                        </div>
                    </div>
                    <div className="d-sm-none d-xs-none d-md-flex col-md-4 col-lg-7 justify-content-center align-items-center">
                        <h1 className="say-hello">Say hello.</h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
