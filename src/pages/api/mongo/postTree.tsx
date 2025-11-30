import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { FethchedDiagramType } from "@/models/Tree.model";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const modelData = req.body;
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const trees = await db
      .collection("TreeDiagram")
      .find({ diagramId: req.body.diagramId })
      .toArray();
    // TODO: Check and add user
    if (trees.length === 0) {
      console.log("SAVE");
      await db.collection("TreeDiagram").insertOne(modelData);
    }
    if (trees.length > 1) {
      res.status(500).json({ message: "More than one diagram found." });
    } else {
      console.log(modelData);
      await db
        .collection("TreeDiagram")
        .updateOne({ diagramId: modelData.diagramId }, { $set: modelData });
      console.log("UPDATE SUCCESS");
    }
    res.json(trees);
  } catch (e) {
    res.status(500).json({ message: "Unable to save diagram." });
    if (e instanceof Error) {
      res.statusMessage = `Error: ${e.message}`;
    }
    console.error(e);
  }
};
