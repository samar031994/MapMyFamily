import { FethchedDiagramType } from "@/models/Tree.model";
import { Session } from "next-auth";

export const saveDiagram = (
  diagramData: FethchedDiagramType,
  data: Session,
  diagramId: string
) => {
  console.log(diagramData);
  const response = fetch("/api/mongo/postTree", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      diagramId: diagramData.diagramId,
      modelData: diagramData.modelData,
      savedBy: diagramData.savedBy,
    }),
  })
    .then((res) => {
      console.log({
        status: res.status,
        statusText: res.statusText,
      });
    })
    .catch((err) => {
      console.log("Error saving diagram");
      console.error(err);
    });
};

export const fetchDiagram = async (diagramId: string) => {
  console.log(diagramId);
  const response = await fetch("/api/mongo/getTree?diagramId=" + diagramId, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  if (response.status === 200) {
    return data[0] as FethchedDiagramType;
  } else if (response.status === 404) {
    return {
      diagramId: diagramId,
      modelData: { nodes: [], links: [] },
      savedBy: "",
    } as FethchedDiagramType;
  }
};
