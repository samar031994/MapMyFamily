import * as go from "gojs";

export interface FethchedDiagramType {
  diagramId: string;
  modelData: DiagramModelType;
  savedBy: string;
  _id?: string;
}

export interface SpouseType {
  name: string;
  birthYear: string;
  deathYear: string;
  gender: string;
}

export interface NodeModelType {
  key: string;
  name: string;
  birthYear: string;
  deathYear: string;
  city: string;
  gender: string;
  location: string;
  spouseExists?: boolean;
  spouse?: SpouseType;
}

export interface LinkModelType {
  key: string;
  fromNode: string;
  toNode: string;
  fromPort: string;
  toPort: string;
  points: string[];
}

export interface DiagramModelType {
  nodes: NodeModelType[];
  links: LinkModelType[];
}

export interface DiagramActions {
  applyChanges: (currentNode: NodeModelType) => void;
}
