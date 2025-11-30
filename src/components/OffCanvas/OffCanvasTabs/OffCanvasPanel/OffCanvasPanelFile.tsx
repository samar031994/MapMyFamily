import React from "react";
import * as S from "./OffCanvasPanel.style";
import { Button } from "@mantine/core";
import { convertDiagramData } from "@/utils/Diagram.utils";
import {
  FethchedDiagramType,
  LinkModelType,
  NodeModelType,
} from "@/models/Tree.model";
import { useRouter } from "next/router";
import { saveDiagram } from "@/services/TreeDiagram/TreeDiagram.service";
import { useSession } from "next-auth/react";
import * as G from "../../../Global.atoms";
import { useAtom } from "jotai";

const OffCanvasPanelFile = ({
  diagramRef,
}: {
  diagramRef: React.RefObject<go.Diagram>;
}) => {
  const { data } = useSession();
  const router = useRouter();
  const dia_id = router.query["treeId"];
  const [diagramObjectId] = useAtom(G.DiagramObjectIdAtom);
  return (
    <S.PanelWrapper>
      <Button
        style={{ margin: "6px 0 0 6px", width: "50%" }}
        onClick={() => {
          if (data?.user) {
            const diaToSave = convertDiagramData(
              diagramRef.current?.model.nodeDataArray as NodeModelType[],
              (diagramRef.current?.model as go.GraphLinksModel)
                .linkDataArray as LinkModelType[],
              dia_id as string
            );
            const saveJson = {
              modelData: diaToSave,
              diagramId: dia_id,
              savedBy: data.user.email,
              _id: diagramObjectId,
            } as FethchedDiagramType;
            dia_id !== "sandbox" &&
              saveDiagram(saveJson, data, dia_id as string);
          } else {
            // TODO: Prompt sign in or add snackbar error message
          }
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
