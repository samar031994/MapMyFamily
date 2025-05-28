import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.email) {
      res.status(400).json({ message: "Missing query parameter: email" });
      return;
    }
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const trees = await db.collection("TreeDiagram").find({
        savedBy: req.query.email,
    }).toArray();
    if (trees.length === 0) {
      console.log("No diagrams found for this user.");
      res.status(404);
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