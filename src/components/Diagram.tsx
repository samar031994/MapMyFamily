import React from "react";
import { ReactDiagram } from "gojs-react";
import * as go from 'gojs'

const $ = go.GraphObject.make;
const TreeDiagram = () => {
    function initDiagram() {
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
          new go.Diagram(
            {
              'undoManager.isEnabled': true,  // must be set to allow for model change listening
              // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
              'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
              model: new go.GraphLinksModel(
                {
                  linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                })
            });
        diagram.addDiagramListener("BackgroundContextClicked",(e: go.DiagramEvent) => {

            diagram.model.addNodeData({})
        })
        // define a simple Node template
        diagram.nodeTemplate =
        $(go.Node, "Spot",
            $(go.Panel, "Auto",
              $(go.Shape, "RoundedRectangle",
                {
                  fill: "lightblue", // Default color
                  strokeWidth: 1, // Border width
                },
                new go.Binding("fill", "color") // Bind "color" data property to fill
              ),
              $(go.TextBlock,
                {
                  margin: 8,
                  font: "bold 14px sans-serif",
                  stroke: "black"
                },
                new go.Binding("text", "key") // Bind "key" data property to text
              )
            ),
            // Ports
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
          );

          function makePort(name, spot, output, input) {
            return $(go.Shape, "Circle",
              {
                fill: "transparent", // Default color
                stroke: null, // No border
                desiredSize: new go.Size(8, 8),
                alignment: spot, // Align the port on the given spot
                alignmentFocus: spot, // Align focus on the same spot
                portId: name, // Declare this object to be a port
                fromSpot: spot, toSpot: spot, // Links come/go from the specific side
                fromLinkable: output, toLinkable: input, // Whether the port is linkable
                cursor: "pointer" // Show a pointer cursor when hovering over
              },
              // Optional: Change appearance on hover
              new go.Binding("fill", "portColor").makeTwoWay()
            );
        }
        return diagram;
      }

    return (
        <>
            <ReactDiagram 
                divClassName="diagram-component"
                initDiagram={initDiagram}
                nodeDataArray={[]}
                linkDataArray={[]}
            />
        </>
    )
}

export default TreeDiagram