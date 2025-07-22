import React from "react";
import { atom } from "jotai"
import { NodeModelType } from "@/models/Tree.model";

export const SelectedNodeAtom = atom<NodeModelType | null>(null)