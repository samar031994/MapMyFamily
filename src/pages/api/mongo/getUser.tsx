import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (
      req.query.email?.length === 0 ||
      !req.query.email ||
      req.query.email.length > 1
    ) {
      res.status(500).json({ message: "Single email is required." });
    }
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const user = await db
      .collection("User")
      .find({ email: req.query.email })
      .toArray();
    if (user.length === 0) {
      res.status(404).json({ message: "No user found." });
    }
    if (user.length > 1) {
      res.status(404).json({ message: "More than one user found." });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Unable to fetch user." });
    if (e instanceof Error) {
      res.statusMessage = `Error: ${e.message}`;
    }
    console.error(e);
  }
};
