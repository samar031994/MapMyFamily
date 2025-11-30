import { NodeModelType } from "@/models/Tree.model";
import * as go from "gojs";
import build from "next/dist/build";

const $ = go.GraphObject.make;

export const buildContextMenu = () => {
  return $(
    "ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "Add spouse"), {
      click: (e: go.InputEvent, obj: go.GraphObject) => {
        e.diagram.model.commit((m: go.Model) => {
          m.setDataProperty(obj.part?.data, "spouseExists", true);
        });
      },
    })
  );
};

export const NodeTemplate = $(
  go.Node,
  "Spot",
  {
    locationSpot: go.Spot.Center,
    contextMenu: buildContextMenu(),
  },
  new go.Binding("location", "location", (x: string) => {
    return go.Point.parse(x);
  }).makeTwoWay(go.Point.stringify),
  // Main node panel
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
        strokeWidth: 4, // Border width
      },
      new go.Binding("fill", "gender", (g) => {
        switch (g) {
          case "Male":
            return "#587ff5";
          case "Female":
            return "#f556dd";
          default:
            return "#96e890";
        }
      })
    ),
    $(go.Panel, "Vertical").add(
      $(
        go.TextBlock, // Name textBlock
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
        new go.Binding("location", "location").makeTwoWay(go.Point.parse),
        new go.Binding("text", "name", (a) => a).makeTwoWay()
      ),
      $(
        go.TextBlock,
        {
          margin: 8,
          cursor: "pointer",
          isMultiline: false,
          font: "14px sans-serif",
          stroke: "black",
          editable: true,
          alignmentFocus: go.Spot.BottomCenter,
          alignment: new go.Spot(0.5, 0.5),
        },
        new go.Binding("text", "gender", (a: go.ObjectData) => a).makeTwoWay()
      ),
      $(
        go.Panel,
        "Horizontal",
        $(
          go.TextBlock,
          {
            isMultiline: false,
            margin: 4,
            font: "10px sans-serif",
            stroke: "black",
            editable: true,
            alignmentFocus: go.Spot.BottomCenter,
            alignment: new go.Spot(0.5, 0.5),
          },
          new go.Binding("text", "city").makeTwoWay()
        )
      )
    ),
    $(
      go.Panel,
      "Vertical",
      {
        alignment: new go.Spot(0, 0.7),
        alignmentFocus: go.Spot.Center,
      },
      $(
        go.Picture,
        {
          margin: 16,
          width: 48,
          height: 48,
          source: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        new go.Binding("source", "gender", (g) => {
          switch (g) {
            default:
              return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }
        })
      )
    )
  ),
  // Spouse panel (only visible if spouseExists)
  $(
    go.Panel,
    "Auto",
    {
      alignment: go.Spot.Right,
      alignmentFocus: go.Spot.Left,
    },
    new go.Binding("visible", "", (data: NodeModelType) => !!data.spouseExists),
    $(
      go.Shape,
      "RoundedRectangle",
      {
        width: 250,
        height: 150,
        fill: "#96e890",
        opacity: 0.5, // Slightly transparent
        margin: new go.Margin(0, 0, 0, 20),
      },
      new go.Binding("fill", "", (g: NodeModelType) => {
        const spouseGender = g.spouse?.gender;
        switch (spouseGender) {
          case "Male":
            return "#587ff5";
          case "Female":
            return "#f556dd";
          default:
            return "#96e890";
        }
      })
    ),
    $(go.Panel, "Vertical").add(
      $(
        go.TextBlock,
        {
          cursor: "pointer",
          isMultiline: false,
          margin: 8,
          font: "bold 16px sans-serif",
          stroke: "black",
          editable: false, // Not editable
          alignmentFocus: go.Spot.TopCenter,
          alignment: new go.Spot(0, 0.5),
        },
        new go.Binding("text", "", (x: NodeModelType) => {
          const spouseName = x.spouse?.name;
          return spouseName || "Spouse Name";
        })
      ),
      $(
        go.TextBlock,
        {
          margin: 8,
          cursor: "pointer",
          isMultiline: false,
          font: "14px sans-serif",
          stroke: "black",
          editable: false,
          alignmentFocus: go.Spot.BottomCenter,
          alignment: new go.Spot(0.5, 0.5),
        },
        new go.Binding("text", "spouseGender", (x: NodeModelType) => {
          return x.spouse?.gender || "Gender";
        }).makeTwoWay()
      )
    ),
    $(
      go.Panel,
      "Vertical",
      {
        alignment: new go.Spot(0, 0.7),
        alignmentFocus: go.Spot.Center,
      },
      $(
        go.Picture,
        {
          margin: 16,
          width: 48,
          height: 48,
          opacity: 0.5, // Slightly transparent
          source: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        new go.Binding("source", "spouseGender", (g) => {
          switch (g) {
            // You can use different images for spouse gender if desired
            default:
              return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
          }
        })
      )
    )
  ),
  // Ports for main node only
  makePort("T", go.Spot.Top, true, true),
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
  adjusting: go.LinkAdjusting.End,
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
