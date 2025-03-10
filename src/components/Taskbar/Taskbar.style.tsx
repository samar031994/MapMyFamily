import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export const TaskbarWrapper = styled.div`
  display: block;
  width: 100vw;
`;
export const TaskbarContainer = styled.div`
  margin-right: 0px;
  margin-left: 0px;
  padding-right: 8px;
  padding-left: 8px;
`;
export const TaskbarContainerAuth = styled.div`
  margin-right: 30px;

  padding-right: 8px;
  padding-left: 8px;
  justify-content: end;
`;
export const TaskbarNav = styled(Navbar)`
  background-image: linear-gradient(180deg, #4976a3 0%, #77a4d1 100%);
  height: 80px;
  flex-wrap: nowrap;
`;
export const ExpandButton = styled(Button)`
  background: #b2c3d4;
`;
