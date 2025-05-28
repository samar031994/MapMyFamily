import React, { useState } from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useRouter } from "next/router";
import * as TS from "../components/Taskbar/Taskbar.style";
import { Tooltip } from "react-tooltip";
import LoginBtn from "@/components/LoginBtn";
import { useSession } from "next-auth/react";

const generateNewDiagramId = async (email: string) => {
  const diagrams = await fetch("/api/mongo/getAllUserDiagrams?email=" + email)
    .then((res) => {
      console.log(res)
      if (res.status === 404) {
        console.log("No diagrams found for this user.");
        // If no diagrams are found, return an empty array
        return [];
      }
      return res.json();
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
  if (!diagrams || diagrams.length === 0) {
    console.log("No diagrams found for this user, creating a new one.");
    console.log(email)
    return `${email}_diagram_${1}`;
  }
  if (diagrams) {
    console.log(diagrams);
    diagrams.forEach((dia) => {
      const counter =
        dia.diagramId.split("_")[dia.diagramId.split("_").length - 1];
      return `${email}_diagram_${counter + 1}`;
    });
  }
};

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { data } = useSession();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <>
      <TS.TaskbarNav expand="lg">
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
              <LoginBtn />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              style={{ width: "20%", margin: "10px" }}
              variant="primary"
              size="lg"
              onClick={() => {
                router.push("/familyTree/sandbox");
              }}
            >
              Get Started
            </Button>
            {data?.user && (
              <Button
                style={{ width: "20%" }}
                variant="primary"
                size="lg"
                onClick={() => router.replace("/dashboard")}
              >
                Dashboard
              </Button>
            )}
            {data?.user && (
              <Button
                style={{ width: "20%", margin: "10px" }}
                variant="primary"
                size="lg"
                onClick={async () => {
                  const newKey = await generateNewDiagramId(data?.user?.email);
                  console.log(newKey)
                  router.replace("/familyTree/" + newKey);
                }}
              >
                New Diagram
              </Button>
            )}
          </div>
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
          <Button
            data-tooltip-id="contactTooltip"
            variant="light"
            onClick={() => {
              setTooltipVisible(!tooltipVisible);
            }}
          >
            Contact Us
          </Button>
        </Container>
      </section>
      <Tooltip id="contactTooltip" place="right" variant="light">
        Email: sam.manjeshwar@gmail.com
      </Tooltip>
      <footer className="text-center py-3 bg-light">
        <Container>
          <p>&copy; 2025 MapMyFamily. All Rights Reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default LandingPage;
