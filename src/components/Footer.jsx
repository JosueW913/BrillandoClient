import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../images/logo.png"
import { Container} from "react-bootstrap"

const Footer = () => {
  return (
    <div className="footer">
        <div className="top">
            <div>
                <img className='footer-logo' src={logo} alt="logo" />
            </div>
            <div>
            <Container fluid >
			©️ Developed by <a style={{color: "black"}} href="https://github.com/JosueW913">Josue Williams</a>
		    </Container>
            </div>
        </div>
    </div>
  )
}

export default Footer