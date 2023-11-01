// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built With  Sanujen Premkumar(200583P) -  Joel Sathiyendra Thiyaheswaran(200590J) -  Sandaruth Siriwardana(200607V)
          {/* <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://youtube.com/indiancoders"}
            >
              Demo
            </Link>
          </span> */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
