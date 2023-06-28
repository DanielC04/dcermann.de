import "./Contact.scss";
import { BasicInfo } from "../loaded_data_types";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from "./EmailjsLogin";
import { Alert } from "react-bootstrap";

interface Props {
    basicInfo: BasicInfo | undefined;
}

const ALERT_FADE_TIME_OUT = 5_000;

function Contact(props: Props) {
    const [alert, setAlert]: any = useState(undefined);

    const title = props.basicInfo?.section_name.contact;
    const form: any = useRef();

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        e.preventDefault();

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(
                (result) => {
                    const successAlert = <CustomAlert isError={false} />;
                    setAlert(successAlert);
                    setTimeout(() => setAlert(undefined), ALERT_FADE_TIME_OUT);
                },
                (error) => {
                    const errorAlert = <CustomAlert isError={false} />;
                    setAlert(errorAlert);
                    setTimeout(() => setAlert(undefined), ALERT_FADE_TIME_OUT);
                }
            );
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
                                    <input
                                        type="text"
                                        name="name"
                                        className="input"
                                        required
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="user-box">
                                    <input
                                        type="textx"
                                        name="email"
                                        className="input"
                                        required
                                    />
                                    <label>Email</label>
                                </div>
                                <div className="user-box">
                                    <textarea
                                        className="input"
                                        name="message"
                                    ></textarea>
                                    <label>Message</label>
                                </div>
                                <center>
                                    <button type="submit">
                                        <i
                                            className={`devicon-line-plain icon`}
                                        ></i>
                                        &gt;{" "}
                                        <span style={{ marginLeft: "-12px" }}>
                                            _
                                        </span>{" "}
                                        SEND
                                        <span className="animation"></span>
                                    </button>
                                </center>
                            </form>
                            <div className="mt-4">{alert}</div>
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

function CustomAlert(props: { isError: boolean }) {
    return (
        <Alert variant={props.isError ? "danger" : "success"}>
            {props.isError
                ? "Sending Message failed :( Try again later"
                : "Message sent successfully :)"}
        </Alert>
    );
}

export default Contact;
