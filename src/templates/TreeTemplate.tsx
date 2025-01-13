import * as go from 'gojs'

const $ = go.GraphObject.make;

export const NodeTemplate = $(go.Node, "Spot",
                $(go.Panel, "Auto",
                  $(go.Shape, "RoundedRectangle",
                    {
                      width:250,
                      height:150,
                      fill: "#EBE6E4", // Default color
                      strokeWidth: 1, // Border width
                    },
                    new go.Binding("fill", "gender", (g) => {
                        switch (g) {
                            case 'male': return "#9AB5F3"
                            break;
                            case 'female': return '#F39AC3'
                            break;
                            default: return 'gray'
                        }
                    })
                  ),
                  $(go.Panel, "Vertical").add(
                    $(go.TextBlock, //Name textBlock
                        {
                          margin: 8,
                          font: "bold 16px sans-serif",
                          stroke: "black",
                          editable: true,
                          alignmentFocus: go.Spot.TopCenter,
                          alignment: new go.Spot(0, 0.5)
                        },
                        new go.Binding("text", "name").makeTwoWay() // Bind "key" data property to text
                      ),
                        $(go.TextBlock,
                            {
                                margin: 8,
                                font: "14px sans-serif",
                                stroke: "black",
                                editable: true,
                                alignmentFocus: go.Spot.BottomCenter,
                                alignment: new go.Spot(0.5, 0.5)
                            },
                            new go.Binding("text", "gender").makeTwoWay()
                    ),
                    $(go.Panel, "Horizontal",
                        $(go.TextBlock,
                            {
                                margin: 4,
                                font: "10px sans-serif",
                                stroke: "black",
                                editable: true,
                                alignmentFocus: go.Spot.BottomCenter,
                                alignment: new go.Spot(0.5, 0.5)
                            },
                            new go.Binding("text","birthYear").makeTwoWay()
                        ),
                        $(go.TextBlock,
                            {
                                text: " - ",
                                font: "10px sans-serif",
                                editable: false
                            }
                        ),
                        $(go.TextBlock,
                            {
                                margin: 4,
                                font: "10px sans-serif",
                                stroke: "black",
                                editable: true,
                                alignmentFocus: go.Spot.BottomCenter,
                                alignment: new go.Spot(0.5, 0.5)
                            },
                            new go.Binding("text","deathYear").makeTwoWay()
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

export const LinkTemplate = $(go.Link,
    {
        routing: go.Routing.AvoidsNodes,
        reshapable: true,
        resegmentable: true,
        segmentIndex: 2
    }
)

function makePort(name: string, spot: go.Spot, output: boolean, input: boolean) {
    return $(go.Shape, "Circle",
      {
        fill: "white", // Default color
        stroke: "black", // No border
        desiredSize: new go.Size(8, 8),
        alignment: spot, // Align the port on the given spot
        alignmentFocus: spot, // Align focus on the same spot
        portId: name, // Declare this object to be a port
        fromSpot: spot, toSpot: spot, // Links come/go from the specific side
        fromLinkable: output, toLinkable: input, // Whether the port is linkable
        cursor: "pointer" // Show a pointer cursor when hovering over
      },
      // Optional: Change appearance on hover
      new go.Binding("fill", "pink").makeTwoWay()
    );
}