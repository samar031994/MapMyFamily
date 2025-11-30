"use client";
import React, { useEffect, useState } from "react";
//import TreeDiagram from '../../components/Diagram'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import { fetchDiagram } from "@/services/TreeDiagram/TreeDiagram.service";
import { FethchedDiagramType } from "@/models/Tree.model";
import { useAtom } from "jotai";
import * as G from "../../components/Global.atoms";

const FamilyTree = () => {
  const TreeDiagram = dynamic(import("../../components/TreeDiagram/Diagram"));
  const router = useRouter();
  const { treeId } = router.query;
  console.log(treeId);
  const [diagramData, setDiagramData] = useState<FethchedDiagramType | null>(
    null
  );
  const [objectId, setObjectId] = useAtom(G.DiagramObjectIdAtom);
  useEffect(() => {
    if (treeId) {
      fetchDiagram(treeId as string)
        .then((data: FethchedDiagramType | undefined) => {
          if (data) {
            console.log(data);
            setDiagramData(data);
            setObjectId(data._id || null);
            console.log(data);
          } else {
            console.error("No diagram data returned");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [treeId]);
  if (!treeId) {
    return <div>Loading...</div>;
  }
  return (
    <SSRProvider>
      <TreeDiagram diagramModel={diagramData as FethchedDiagramType} />
    </SSRProvider>
  );
};

export default FamilyTree;
