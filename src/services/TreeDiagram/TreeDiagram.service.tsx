import { Session } from "next-auth";

export const saveDiagram = (
  diagramData: any,
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
