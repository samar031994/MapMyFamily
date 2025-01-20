export const getDiagram = async (diagramId: string) => {
    const apiBase = process.env.NEXT_PUBLIC_API_ROUTE
    const apiRoute = apiBase + "/diagrams/" + diagramId
    const response = await fetch(apiRoute)
    return response.json()
}

export const saveDiagram = (diagramId: string, diagramData: any) => {
    const apiBase = process.env.NEXT_PUBLIC_API_ROUTE
    const apiRoute = apiBase + "/diagrams/" + diagramId
    const response = fetch(apiRoute, {
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(diagramData)
    })
}