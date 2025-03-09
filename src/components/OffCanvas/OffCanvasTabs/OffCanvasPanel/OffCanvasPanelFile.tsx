import React from "react";
import * as S from "./OffCanvasPanel.style";
import { Button } from "@mantine/core";
import { convertDiagramData } from "@/utils/Diagram.utils";
import { LinkModelType, NodeModelType } from "@/models/Tree.model";
import { useRouter } from "next/router";
import { saveDiagram } from "@/services/TreeDiagram/TreeDiagram.service";

const OffCanvasPanelFile = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  const router = useRouter();
  const dia_id = router.query["treeId"];
  return (
    <S.PanelWrapper>
      <Button
        style={{ margin: "6px 0 0 6px", width: "50%" }}
        onClick={() => {
          const diaToSave = convertDiagramData(
            diagramRef.current?.model.nodeDataArray as NodeModelType[],
            (diagramRef.current?.model as go.GraphLinksModel)
              .linkDataArray as LinkModelType[],
            dia_id as string
          );
          dia_id !== "sandbox" && saveDiagram(diaToSave);
        }}
      >
        Save
      </Button>
      <Button style={{ margin: "6px 0 0 6px", width: "50%" }}>Open</Button>
      <Button style={{ margin: "6px 0 0 6px", width: "50%" }}>New</Button>
    </S.PanelWrapper>
  );
};

export default OffCanvasPanelFile;
