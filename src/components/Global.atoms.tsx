import React from "react";
import { atom } from "jotai";
import { DiagramActions, NodeModelType } from "@/models/Tree.model";

export const SelectedNodeAtom = atom<NodeModelType | null>(null);
export const DiagramActionsAtom = atom<DiagramActions | null>(null);
export const DiagramObjectIdAtom = atom<string | null>(null);
