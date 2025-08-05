import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>
          <a href="#">Company</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="#">Offieces</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="Instagram" />
          <img src={pintester_icon} alt="Pinterest" />
            <img src={whatsapp_icon} alt="WhatsApp" />
        </div>
      </div>
        <div className="footer-copyright">
            <p>© 2025 Shopper. All rights reserved.</p>
            </div>
            
    </div>
  );
};

export default Footer;
