import "./Contact.scss";
import { BasicInfo } from "../loaded_data_types";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from "./EmailjsLogin";

interface Props {
    basicInfo: BasicInfo | undefined;
}

function Contact(props: Props) {
    const title = props.basicInfo?.section_name.contact;
    const form: any = useRef();

    
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e)
        e.preventDefault();
    
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };


    return (
        <section id="contact">
            <h2>{title}</h2>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-7 col-lg-5 justify-content-center">
                        <div className="login-box">
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="user-box">
                                    <input type="text" name="name" className="input" required />
                                    <label>Name</label>
                                </div>
                                <div className="user-box">
                                    <input type="textx" name="email" className="input" required />
                                    <label>Email</label>
                                </div>
                                <div className="user-box">
                                    <textarea className="input" name="message">
                                    </textarea>
                                    <label>Message</label>
                                </div>
                                <center>
                                    <button type="submit">
                                        <i
                                            className={`devicon-line-plain icon`}
                                        ></i>
                                        &gt; <span style={{marginLeft: '-12px'}}>_</span> SEND
                                        <span className="animation"></span>
                                    </button>
                                </center>
                            </form>
                        </div>
                    </div>
                    <div className="d-sm-none d-xs-none d-md-flex col-md-4 col-lg-7 justify-content-center align-items-center">
                        <h2 className="say-hello">Say hello.</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
