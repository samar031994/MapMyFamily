"use client";
import React, { useRef } from "react";
import { ReactDiagram } from "gojs-react";
import * as go from "gojs";
import * as DS from "./Diagram.style";
import Taskbar from "../Taskbar/Taskbar";
import {
  NodeTemplate,
  LinkTemplate,
  LinkNodeTemplate,
} from "@/templates/TreeTemplate";
import { generateNewNode, getLargestKey } from "@/utils/Diagram.utils";
import * as TA from "../../models/Tree.atoms";
import { useAtom } from "jotai";

const $ = go.GraphObject.make;
const TreeDiagram = () => {
  const [diagramModel, setDiagramModel] = useAtom(TA.DiagramDataAtom);
  const [show, setShow] = useAtom(TA.MenuAtom);
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
  // diagram.addDiagramListener("ObjectSingleClicked", (e: go.DiagramEvent) => {
  //   console.log(diagramRef.current.getDiagram().model.data);
  //   setShow(true);
  // });
  diagram.addDiagramListener(
    "BackgroundContextClicked",
    (e: go.DiagramEvent) => {
      e.diagram.lastInput.viewPoint &&
        diagram.model.addNodeData(
          generateNewNode(e.diagram.lastInput.documentPoint)
        );
    }
  );
  // define a simple Node template
  diagram.nodeTemplate = NodeTemplate;
  diagram.linkTemplate = LinkTemplate;
  diagram.nodeTemplateMap.add("LinkLabel", LinkNodeTemplate);
  diagram.toolManager.linkingTool.archetypeLabelNodeData = {
    category: "LinkLabel",
  };
  (diagram.model as go.GraphLinksModel).makeUniqueLinkKeyFunction = (
    m: go.GraphLinksModel,
    data: go.ObjectData
  ) => {
    return `link:${getLargestKey(m.linkDataArray)}`;
  };
  diagram.model.makeUniqueKeyFunction = (m: go.Model, data: go.ObjectData) => {
    return `node:${getLargestKey(m.nodeDataArray)}`;
  };

  return (
    <>
      <DS.DiagramWrapper>
        <Taskbar diagramRef={diagramRef} />
        <ReactDiagram
          //ref={diagramRef}
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
