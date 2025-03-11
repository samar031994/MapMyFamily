import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const users = await db.collection("User").find({}).toArray();
    if (users.length === 0) {
      res.status(404).json({ message: "No user found." });
    }
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Unable to fetch users." });
    if (e instanceof Error) {
      res.statusMessage = `Error: ${e.message}`;
    }
    console.error(e);
  }
};
