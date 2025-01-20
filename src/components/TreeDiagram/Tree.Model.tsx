import React from "react";
import * as go from 'gojs'

export interface TreeNodeType {
    key: string
    firstName: string
    lastName: string
    location: go.Point
    category: string
}

export interface TreeLinkType {
    key: string
    fromNode: string
    toNode: string
    portId: string
    points: string
    category: string
}

export interface LinkLabelType {
    linkKey: string
    category: string
    labelKey: string
} 