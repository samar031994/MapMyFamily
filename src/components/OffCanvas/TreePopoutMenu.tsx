import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAtom } from "jotai";
import * as TA from "../../models/Tree.atoms";
import * as TPS from "./TreePopoutMenu.style";
import Button from "react-bootstrap/Button";
import { saveDiagram } from "@/services/TreeDiagram/TreeDiagram.service";
import { convertDiagramData } from "@/utils/Diagram.utils";
import { LinkModelType, NodeModelType } from "@/models/Tree.model";

const TreePopoutMenu = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  const [show, setShow] = useAtom(TA.MenuAtom);
  const handleClose = () => setShow(false);

  return (
    <TPS.OffCanvasWrapper show={show} onHide={handleClose}>
      <TPS.OffCanvasHeader closeButton>
        <Offcanvas.Title>MapMyFamily</Offcanvas.Title>
      </TPS.OffCanvasHeader>
      <Offcanvas.Body>
        <Button
          variant="secondary"
          onClick={() => {
            const diaToSave = convertDiagramData(
              diagramRef.current?.model.nodeDataArray as NodeModelType[],
              (diagramRef.current?.model as go.GraphLinksModel)
                .linkDataArray as LinkModelType[]
            );
            console.log(diaToSave);
            saveDiagram(diaToSave);
          }}
        >
          Save Diagram
        </Button>
      </Offcanvas.Body>
    </TPS.OffCanvasWrapper>
  );
};

export default TreePopoutMenu;
