import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAtom } from "jotai";
import * as TA from "../../models/Tree.atoms";
import * as TPS from "./TreePopoutMenu.style";
import { saveDiagram } from "@/services/TreeDiagram/TreeDiagram.service";
import { convertDiagramData } from "@/utils/Diagram.utils";
import { LinkModelType, NodeModelType } from "@/models/Tree.model";
import { useRouter } from "next/router";
import OffCanvasTabs from "./OffCanvasTabs/OffCanvasTabs";
import { Container } from "react-bootstrap";
import Image from "next/image";

const TreePopoutMenu = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  const [show, setShow] = useAtom(TA.MenuAtom);
  const handleClose = () => setShow(false);
  const router = useRouter();
  const dia_id = router.query["treeId"];

  return (
    <TPS.OffCanvasWrapper show={show} onHide={handleClose}>
      <TPS.OffCanvasHeader closeButton>
        <Offcanvas.Title>
          MapMyFamily&nbsp;&nbsp;
          <Image
            src={"/MapMyFamilyLogo.webp"}
            width={"50"}
            height={"50"}
            alt="MapMyFamily Logo"
          />
        </Offcanvas.Title>
      </TPS.OffCanvasHeader>
      <OffCanvasTabs diagramRef={diagramRef} />
    </TPS.OffCanvasWrapper>
  );
};

export default TreePopoutMenu;
