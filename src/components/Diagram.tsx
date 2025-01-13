'use client';
import React from "react";
import { ReactDiagram } from "gojs-react";
import * as go from 'gojs'
import * as DS from './Diagram.style'
import { NodeTemplate, LinkTemplate } from "@/templates/TreeTemplate";
import { NodeModelType } from "@/models/Tree.model";

const $ = go.GraphObject.make;
const TreeDiagram = () => {
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
          new go.Diagram(
            {
              'undoManager.isEnabled': true,  // must be set to allow for model change listening
              // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
              'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
              model: new go.GraphLinksModel(
                {
                  linkKeyProperty: 'key',
                  linkFromPortIdProperty: "fromPortId",
                  linkToPortIdProperty: "toPortId",
                  linkFromKeyProperty: "fromNode",
                  linkToKeyProperty: "toNode",
                  nodeKeyProperty: "key"
                })
            });
        diagram.allowResize = true
        diagram.grid.visible = false;
        diagram.grid.gridCellSize = new go.Size(10, 20);
        diagram.toolManager.draggingTool.isGridSnapEnabled = true
        diagram.addDiagramListener("BackgroundContextClicked",(e: go.DiagramEvent) => {

            diagram.model.addNodeData(generateNewNode())
        })
        // define a simple Node template
        diagram.nodeTemplate = NodeTemplate
        // diagram.linkTemplate = LinkTemplate
    const generateNewNode = () => {
      const newNode = {
        name: "name",
        gender: "neutral",
        birthYear: "2000",
        deathYear: "2000",
        city: "",
      } as NodeModelType
      return newNode
    }


    return (
       <DS.DiagramWrapper>
         <ReactDiagram 
            divClassName="diagram-component"
            
            initDiagram={() => {
                return diagram
            }}
            nodeDataArray={[]}
            linkDataArray={[]}
        />
       </DS.DiagramWrapper>
    )
}

export default TreeDiagram