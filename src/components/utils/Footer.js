import React from "react";
import './Footer.scss'

function Footer(props) {
  let networks = []
  if (props.sharedBasicInfo) {
    networks = props.sharedBasicInfo.social.map((network) =>
      <span key={network.name} className="m-4">
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.class}></i>
        </a>
      </span>
    );
  }

  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>
        <div className="copyright py-2 text-center">
          <div className="container">
            <small>
              Copyright &copy;{" "}
              {props.sharedBasicInfo
                ? props.sharedBasicInfo.name
                : "???"}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
