import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../../../public/background/logo.png";
import navIcon1 from "../../../public/background/nav-icon1.svg";
import navIcon2 from "../../../public/background/nav-icon2.svg";
import navIcon3 from "../../../public/background/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img className="the_img" src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a className="the_a" href="#"><img className="the_img" src={navIcon1} alt="Icon" /></a>
              <a className="the_a" href="#"><img className="the_img" src={navIcon2} alt="Icon" /></a>
              <a className="the_a" href="#"><img className="the_img" src={navIcon3} alt="Icon" /></a>
            </div>
            <p className="the_p"> Copyright 2022. All Rights Reserved. Cân Điện Tử QUỐC HƯNG</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}