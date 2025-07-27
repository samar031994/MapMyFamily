import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userData = req.body;
    const client = await clientPromise;
    const db = client.db("map_my_family");
    const users = await db
      .collection("User")
      .find({ email: req.body.email })
      .toArray();
    // TODO: Check and add user
    if (users.length === 0) {
      console.log("SAVE");
      await db.collection("User").insertOne(userData);
      res.status(201).json({ message: "User created successfully." });
    }
    if (users.length > 1) {
      res.status(200).json({ message: "User exists" });
    }
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Unable to get user data." });
    if (e instanceof Error) {
      res.statusMessage = `Error: ${e.message}`;
    }
    console.error(e);
  }
};
