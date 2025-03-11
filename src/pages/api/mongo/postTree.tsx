import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const modelData = req.body;
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const trees = await db.collection("TreeDiagram").find({}).toArray();
    if (trees.length === 0) {
      // POST Tree
    }
    if (trees.length > 1) {
      res.status(500).json({ message: "More than one diagram found." });
    } else {
      //PUT Tree
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
