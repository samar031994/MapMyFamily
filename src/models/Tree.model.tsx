import * as go from 'gojs'

export interface NodeModelType {
    key:string,
    name: string,
    birthYear: string,
    deathYear: string,
    city: string
    gender: string,
    location: string
}

export interface LinkModelType {
    key: string,
    fromNode: string,
    toNode: string,
    fromPort: string,
    toPort: string
}

export interface DiagramModelType {
    nodes: NodeModelType[],
    links: LinkModelType[]
}

export interface DiagramActions {
    applyChanges: (currentNode:NodeModelType) => void,
}