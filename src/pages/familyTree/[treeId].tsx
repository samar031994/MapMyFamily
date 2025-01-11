'use client';
import React from "react";
//import TreeDiagram from '../../components/Diagram'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";


const FamilyTree = () => {
    const TreeDiagram = dynamic(import('../../components/Diagram'))
    const router = useRouter()
    const { treeId } = router.query
    console.log(treeId)
    return (
        <TreeDiagram />
    )
}

export default FamilyTree