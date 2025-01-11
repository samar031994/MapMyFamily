'use client';
import React from "react";
//import TreeDiagram from '../../components/Diagram'
import dynamic from "next/dynamic";


const FamilyTree = ({treeId}: {treeId: string}) => {
    const TreeDiagram = dynamic(import('../../components/Diagram'))
    console.log(treeId)
    return (
        <TreeDiagram />
    )
}

export default FamilyTree