import React, { useState } from "react";
import * as TA from "../../models/Tree.atoms";
import * as TS from "./Taskbar.style";
import { useAtom } from "jotai";
import TreePopoutMenu from "../OffCanvas/TreePopoutMenu";

const Taskbar = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  const [show, setShow] = useAtom(TA.MenuAtom);
  const handleShow = () => setShow(true);
  return (
    <TS.TaskbarWrapper>
      <TS.TaskbarNav expand="x-lg">
        <TS.TaskbarContainer>
          <TS.ExpandButton onClick={handleShow} variant="Light">
            MapMyFamily
          </TS.ExpandButton>
        </TS.TaskbarContainer>
      </TS.TaskbarNav>
      <TreePopoutMenu diagramRef={diagramRef}></TreePopoutMenu>
    </TS.TaskbarWrapper>
  );
};

export default Taskbar;
