'use client';
import React from "react";
import { ReactDiagram } from "gojs-react";
import * as go from 'gojs'
import * as DS from './Diagram.style'
import Taskbar from '../Taskbar/Taskbar'
import { NodeTemplate, LinkTemplate } from "@/templates/TreeTemplate";

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
                  linkLabelKeysProperty: 'labelKey',
                  linkKeyProperty: 'key',
                  linkFromPortIdProperty: "fromPortId",
                  linkToPortIdProperty: "toPortId",
                  linkFromKeyProperty: "fromNode",
                  linkToKeyProperty: "toNode",
                  nodeKeyProperty: "key",
                })
            });
        diagram.allowResize = true
        diagram.grid.visible = false;
        diagram.grid.gridCellSize = new go.Size(10, 20);
        diagram.toolManager.draggingTool.isGridSnapEnabled = true
        diagram.addDiagramListener("BackgroundContextClicked",(e: go.DiagramEvent) => {
            e.diagram.lastInput.viewPoint && diagram.model.addNodeData(generateNewNode(e.diagram.lastInput.documentPoint))
        })
        // define a simple Node template
        diagram.nodeTemplate = NodeTemplate
        diagram.linkTemplate = LinkTemplate
        diagram.nodeTemplateMap.add(
          'LinkLabel',
          new go.Node({
            toLinkable: false,
            selectable: false,
            avoidable: false,
            layerName: 'Foreground'
          }) // always have link label nodes in front of Links
            .add(
              new go.Shape('Ellipse', {
                width: 5,
                height: 5,
                stroke: null,
                portId: '',
                fromLinkable: true,
                toLinkable: false,
                cursor: 'pointer'
              })
            )
        );
        diagram.toolManager.linkingTool.archetypeLabelNodeData = { category: 'LinkLabel' };
    const generateNewNode = (mouseLoc: go.Point) => {
      const newNode = {
        name: "name",
        gender: "gender",
        birthYear: "2000",
        deathYear: "2000",
        city: "",
        location: mouseLoc
      }
      return newNode
    }


    return (
      <>
       <DS.DiagramWrapper>
          <Taskbar />
          <ReactDiagram 
              divClassName="diagram-component"
              
              initDiagram={() => {
                  return diagram
              }}
              nodeDataArray={[]}
              linkDataArray={[]}
          />
       </DS.DiagramWrapper>
      </>
    )
}

export default TreeDiagram