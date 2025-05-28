import { useSession } from "next-auth/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "@mantine/core";
import * as TS from "../../components/Taskbar/Taskbar.style";
import { Container, Nav, Navbar } from "react-bootstrap";
import LoginBtn from "@/components/LoginBtn";
import Image from "next/image";
import * as S from '../../components/Dashboard/Dashboard.style';

const Dashboard = () => {
  const { data } = useSession();
  const email = data?.user?.email;
  console.log(email);
  const [diagrams, setDiagrams] = useState<any[] | null>(null);
  useEffect(() => {
    if (!email) {
      return;
    }
    fetch("/api/mongo/getAllUserDiagrams?email=" + email).then(async (res) =>
      setDiagrams(await res.json())
    );
  }, [email]);
  console.log(diagrams);
  const cards =
    diagrams &&
    email &&
    (diagrams.map((diagram) => {
      return (
        <S.CardObj
          key={diagram.diagramId}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Card.Section style={{ padding: "10px" }}>
            <h2>{diagram.diagramName}</h2>
            <p>{diagram.diagramId}</p>
            <p>{diagram.savedBy}</p>
          </Card.Section>
        </S.CardObj>
      );
    }) || <div>No diagrams found.</div>);
  if (diagrams) {
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
        {cards}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Dashboard;
