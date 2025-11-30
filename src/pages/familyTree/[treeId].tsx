"use client";
import React, { useEffect, useState } from "react";
//import TreeDiagram from '../../components/Diagram'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";
import { fetchDiagram } from "@/services/TreeDiagram/TreeDiagram.service";
import { FethchedDiagramType } from "@/models/Tree.model";

const FamilyTree = () => {
  const TreeDiagram = dynamic(import("../../components/TreeDiagram/Diagram"));
  const router = useRouter();
  const { treeId } = router.query;
  const [diagramData, setDiagramData] = useState<FethchedDiagramType | null>(
    null
  );
  useEffect(() => {
    if (treeId) {
      fetchDiagram(treeId as string)
        .then((data: FethchedDiagramType) => {
          setDiagramData(data);
          console.log(data);
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
