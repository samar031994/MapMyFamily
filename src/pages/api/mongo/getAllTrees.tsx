import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const trees = await db.collection("TreeDiagram").find({}).toArray();
    if (trees.length === 0) {
      res.status(404).json({ message: "No Diagrams found." });
    }
    res.json(trees);
  } catch (e) {
    res.status(500).json({ message: "Unable to fetch diagrams." });
    if (e instanceof Error) {
      res.statusMessage = `Error: ${e.message}`;
    }
    console.error(e);
  }
};
