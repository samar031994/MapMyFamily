import { atom } from "jotai"
import { DiagramModelType } from "./Tree.model"

export const MenuAtom = atom<boolean>(false)

export const DiagramDataAtom = atom<DiagramModelType | null>(null)