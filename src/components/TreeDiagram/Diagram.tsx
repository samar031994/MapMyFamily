"use client";
import React, { useEffect, useRef } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import * as DS from "./Diagram.style";
import Taskbar from "../Taskbar/Taskbar";
import { NodeTemplate, LinkTemplate } from "@/templates/TreeTemplate";
import { generateNewNode, getLargestKey } from "@/utils/Diagram.utils";
import * as TA from "../../models/Tree.atoms";
import * as G from "../Global.atoms";
import { useAtom } from "jotai";
import { FethchedDiagramType, NodeModelType } from "@/models/Tree.model";

const $ = go.GraphObject.make;
const TreeDiagram = ({
  diagramModel,
}: {
  diagramModel: FethchedDiagramType;
}) => {
  const modelData = diagramModel
    ? diagramModel.modelData
    : { nodes: [], links: [] };
  const [, setCurrentNode] = useAtom(G.SelectedNodeAtom);
  const [diagramActions, setDiagramActions] = useAtom(G.DiagramActionsAtom);
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = new go.Diagram({
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    model: new go.GraphLinksModel({
      linkLabelKeysProperty: "labelKey",
      linkKeyProperty: "key",
      linkFromPortIdProperty: "fromPortId",
      linkToPortIdProperty: "toPortId",
      linkFromKeyProperty: "fromNode",
      linkToKeyProperty: "toNode",
      nodeKeyProperty: "key",
    }),
  });
  const diagramRef = useRef(diagram);
  diagram.grid.background = "#cbdff2";
  diagram.setDivBackground("#cbdff2");
  diagram.allowResize = true;
  diagram.grid.visible = false;
  diagram.grid.gridCellSize = new go.Size(10, 20);
  diagram.toolManager.draggingTool.isGridSnapEnabled = true;
  diagram.addDiagramListener("ObjectSingleClicked", (e: go.DiagramEvent) => {
    console.log(e.diagram.selection.first()?.data);
    setCurrentNode(e.diagram.selection.first()?.data as NodeModelType);
  });
  diagram.addDiagramListener(
    "BackgroundContextClicked",
    (e: go.DiagramEvent) => {
      setCurrentNode(null);
      e.diagram.lastInput.viewPoint &&
        diagram.model.addNodeData(
          generateNewNode(e.diagram.lastInput.documentPoint)
        );
    }
  );
  diagram.addDiagramListener(
    "BackgroundSingleClicked",
    (e: go.DiagramEvent) => {
      setCurrentNode(null);
    }
  );
  // define a simple Node template
  diagram.nodeTemplate = NodeTemplate;
  diagram.linkTemplate = LinkTemplate;
  (diagram.model as go.GraphLinksModel).makeUniqueLinkKeyFunction = (
    m: go.GraphLinksModel,
    data: go.ObjectData
  ) => {
    return `link:${getLargestKey(m.linkDataArray)}`;
  };
  diagram.model.makeUniqueKeyFunction = (m: go.Model, data: go.ObjectData) => {
    return `node:${getLargestKey(m.nodeDataArray)}`;
  };
  diagram.model.nodeDataArray = modelData.nodes;
  (diagram.model as go.GraphLinksModel).linkDataArray = modelData.links;

  const applyChanges = (currentNode: NodeModelType) => {
    const diagram = diagramRef.current;
    const node = diagram.findNodeForKey(currentNode.key);
    if (currentNode) {
      diagram.model.commit((m: go.Model) => {
        m.setDataProperty(node?.data, "name", currentNode.name);
        m.setDataProperty(node?.data, "gender", currentNode.gender);
        m.setDataProperty(node?.data, "city", currentNode.city);
        m.setDataProperty(node?.data, "birthYear", currentNode.birthYear);
        m.setDataProperty(node?.data, "deathYear", currentNode.deathYear);
        m.setDataProperty(
          node?.data,
          "spouseExists",
          currentNode.spouseExists || false
        );
        m.setDataProperty(node?.data, "spouse", currentNode.spouse);
      });
    }
  };
  useEffect(() => {
    setDiagramActions({
      applyChanges: applyChanges,
    });
  }, []);
  return (
    <>
      <DS.DiagramWrapper>
        <Taskbar diagramRef={diagramRef} />
        <ReactDiagram
          divClassName="diagram-component"
          initDiagram={() => {
            return diagram;
          }}
          nodeDataArray={diagramRef.current.model.nodeDataArray}
          linkDataArray={
            (diagramRef.current.model as go.GraphLinksModel).linkDataArray
          }
        />
      </DS.DiagramWrapper>
    </>
  );
};

export default TreeDiagram;
