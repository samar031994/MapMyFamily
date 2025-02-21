import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useRouter } from "next/router";
import * as TS from "../components/Taskbar/Taskbar.style";

const LandingPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <TS.TaskbarNav bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#logo">
            <Image
              src={"/MapMyFamilyLogo.webp"}
              width={"50"}
              height={"50"}
              alt="MapMyFamily Logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">MapMyFamily</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </TS.TaskbarNav>

      <header className="text-center py-5 bg-light">
        <Container>
          <Image
            src="/IndexImage.webp"
            alt="MapMyFamily Logo"
            width={"200"}
            height={"200"}
          />
          <h1>Discover Your Family History</h1>
          <p className="lead">
            A powerful web application to map and explore your family tree.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              router.push("/familyTree/1234");
            }}
          >
            Get Started
          </Button>
        </Container>
      </header>

      <section id="features" className="py-5">
        <Container>
          <Row>
            <Col md={4} className="text-center">
              <h3>Interactive Family Tree</h3>
              <p>
                Visualize your ancestry with our intuitive family tree builder.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h3>Collaborate with Relatives</h3>
              <p>
                Invite family members to contribute and enrich your genealogy
                data.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h3>Secure & Private</h3>
              <p>
                Your data is encrypted and protected with industry-leading
                security.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="contact" className="bg-dark text-light py-5 text-center">
        <Container>
          <h2>Get in Touch</h2>
          <p>Have questions? Contact us for more details.</p>
          <Button variant="light">Contact Us</Button>
        </Container>
      </section>

      <footer className="text-center py-3 bg-light">
        <Container>
          <p>&copy; 2025 MapMyFamily. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default LandingPage;
