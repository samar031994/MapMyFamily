'use client';
import React from "react";
//import TreeDiagram from '../../components/Diagram'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SSRProvider } from "react-bootstrap";

const FamilyTree = () => {
    const TreeDiagram = dynamic(import('../../components/TreeDiagram/Diagram'))
    const router = useRouter()
    const { treeId } = router.query
    console.log(treeId)
    return (
        <SSRProvider>
            <TreeDiagram />
        </SSRProvider>
    )
}

export default FamilyTree