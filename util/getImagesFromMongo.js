import mongoose from "mongoose";

export default async function getImagesFromMongo(albumId) {
  var db;

  let albums = [];

  if (!db) {
    try {
      const mongoDB = process.env.MONGOOSE_URL;

      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

      db = mongoose.connection;
      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      try {
        albums = await db.collection(albumId).find().toArray();
      } catch (err) {
        return albums;
      }
      return albums;
    } catch (error) {
      console.log(error);
      return "cant access db";
    }
  }
}
