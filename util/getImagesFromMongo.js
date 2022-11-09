import mongoose from "mongoose";

export default async function getImagesFromMongo(albumId) {
  var db;

  let albums;

  if (!db) {
    try {
      const mongoDB = process.env.MONGO_URL;

      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

      db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB connection error:"));

      albums = await db.collection(albumId).find().toArray();

      return albums;
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
