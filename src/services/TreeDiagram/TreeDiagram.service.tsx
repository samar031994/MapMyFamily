export const getDiagram = async (diagramId: string) => {
    const apiBase = process.env.NEXT_PUBLIC_API_ROUTE
    const apiRoute = apiBase + "/diagrams/" + diagramId
    const response = await fetch(apiRoute)
    return response.json()
}

export const saveDiagram = (diagramData: any) => {
    const apiBase = process.env.NEXT_PUBLIC_API_ROUTE
    const apiRoute = apiBase + "tree_diagram/"
    const response = fetch(apiRoute, {
        method:"POST",
        // headers: {"content-type": "application/json"},
        body: JSON.stringify({
            "model_data": diagramData,
            "users": ["12345"]
        })
    }).then((res) => {
        console.log({
            "status": res.status,
            "statusText": res.statusText
        })
    }).catch((err) => {
        console.error(err)
    })
}