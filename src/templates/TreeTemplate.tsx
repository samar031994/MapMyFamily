import * as go from "gojs";

const $ = go.GraphObject.make;

export const LinkNodeTemplate = $(go.Node, "Auto", {
  toLinkable: false,
  fromLinkable: false,
  selectable: false,
  avoidable: false,
  layerName: "Foreground",
}).add(
  new go.Shape("Ellipse", {
    width: 20,
    height: 5,
    stroke: null,
    portId: "linkNodePort",
    fromLinkable: true,
    toLinkable: false,
    cursor: "pointer",
  }),
  makePort("B", go.Spot.Bottom, true, true)
);

export const NodeTemplate = $(
  go.Node,
  "Spot",
  {
    locationSpot: go.Spot.Center,
  },
  new go.Binding("location", "location").makeTwoWay(go.Point.stringify),
  $(
    go.Panel,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      {
        width: 250,
        height: 150,
        fill: "#96e890", // Default color
        strokeWidth: 1, // Border width
      },
      new go.Binding("fill", "gender", (g) => {
        switch (g) {
          case "male":
            return "#587ff5";
            break;
          case "female":
            return "#f556dd";
            break;
          default:
            return "#96e890";
        }
      })
    ),
    $(go.Panel, "Vertical").add(
      $(
        go.TextBlock, //Name textBlock
        {
          cursor: "pointer",
          isMultiline: false,
          margin: 8,
          font: "bold 16px sans-serif",
          stroke: "black",
          editable: true,
          alignmentFocus: go.Spot.TopCenter,
          alignment: new go.Spot(0, 0.5),
        },
        new go.Binding("text", "name").makeTwoWay() // Bind "key" data property to text
      ),
      $(
        go.TextBlock,
        {
          // textEditor: window.TextEditorSelectBox,
          margin: 8,
          cursor: "pointer",
          isMultiline: false,
          font: "14px sans-serif",
          stroke: "black",
          editable: true,
          alignmentFocus: go.Spot.BottomCenter,
          alignment: new go.Spot(0.5, 0.5),
        },
        new go.Binding("text", "gender").makeTwoWay()
      ),
      $(
        go.Panel,
        "Horizontal",
        $(
          go.TextBlock,
          {
            cursor: "pointer",
            isMultiline: false,
            margin: 4,
            font: "10px sans-serif",
            stroke: "black",
            editable: true,
            alignmentFocus: go.Spot.BottomCenter,
            alignment: new go.Spot(0.5, 0.5),
          },
          new go.Binding("text", "birthYear").makeTwoWay()
        ),
        $(go.TextBlock, {
          cursor: "pointer",
          isMultiline: false,
          text: " - ",
          font: "10px sans-serif",
          editable: false,
        }),
        $(
          go.TextBlock,
          {
            cursor: "pointer",
            isMultiline: false,
            margin: 4,
            font: "10px sans-serif",
            stroke: "black",
            editable: true,
            alignmentFocus: go.Spot.BottomCenter,
            alignment: new go.Spot(0.5, 0.5),
          },
          new go.Binding("text", "deathYear").makeTwoWay()
        )
      )
    )
  ),
  // Ports
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true)
);

export const LinkTemplate = new go.Link({
  routing: go.Routing.AvoidsNodes,
  curve: go.Curve.JumpOver,
  corner: 5,
  toShortLength: 4,
  relinkableFrom: true,
  toEndSegmentLength: 0,
  relinkableTo: true,
  reshapable: true,
  resegmentable: true,
  // mouse-overs subtly highlight links:
  // mouseEnter: (e:go.InputEvent, link) => (link.findObject('HIGHLIGHT').stroke = link.diagram.themeManager.findValue('linkOver', 'colors')),
  // mouseLeave: (e, link) => (link.findObject('HIGHLIGHT').stroke = 'transparent'),
  // context-click creates an editable link label
})
  .bindTwoWay("points")
  .add(
    // the highlight shape, normally transparent
    new go.Shape({
      isPanelMain: true,
      strokeWidth: 8,
      stroke: "transparent",
      name: "HIGHLIGHT",
    }),
    // the link path shape
    new go.Shape({ isPanelMain: true, strokeWidth: 2 })
  );

function makePort(
  name: string,
  spot: go.Spot,
  output: boolean,
  input: boolean
) {
  return $(
    go.Shape,
    "Circle",
    {
      fill: "white", // Default color
      stroke: "black", // No border
      desiredSize: new go.Size(8, 8),
      alignment: spot, // Align the port on the given spot
      alignmentFocus: spot, // Align focus on the same spot
      portId: name, // Declare this object to be a port
      fromSpot: spot,
      toSpot: spot, // Links come/go from the specific side
      fromLinkable: output,
      toLinkable: input, // Whether the port is linkable
      cursor: "pointer", // Show a pointer cursor when hovering over
    },
    // Optional: Change appearance on hover
    new go.Binding("fill", "pink").makeTwoWay()
  );
}
