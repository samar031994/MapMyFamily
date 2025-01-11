import React from "react";

export interface TreeNodeType {
    key: string
    firstName: string
    lastName: string
    location: string
}

export interface TreeLinkType {
    key: string
    fromNode: string
    toNode: string
    portId: string
    points: string
}