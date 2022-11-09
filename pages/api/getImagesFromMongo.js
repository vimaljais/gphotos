import mongoose from "mongoose";

export default async function handler(req, res) {
  var db;

  if (!db) {
    try {
      const mongoDB = process.env.MONGO_URL;
      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

      db = mongoose.connection;

      var albums = await db.collection("album_data").find().toArray();

      db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } catch (error) {
      console.log(error);
    }
  }

  if (1) {
    res.status(200).json(albums);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
