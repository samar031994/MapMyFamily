import React from "react";
import * as go from 'gojs'

export const getLargestKey = (arr: go.ObjectData[]) => {
    let largest = 1
    arr.forEach((item) => {
        const key = parseInt(item.key.split(':')[1])
        console.log(key)
        if (key >= largest) {
            largest = key+1
        }
    })
    console.log(largest)
    return largest.toString()
}

export const generateNewNode = (mouseLoc: go.Point) => {
    const newNode = {
    name: "name",
    gender: "gender",
    birthYear: "2000",
    deathYear: "2000",
    city: "",
    location: mouseLoc,
    category: "Node"
    }
    return newNode
}