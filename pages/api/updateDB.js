import mongoose from "mongoose";

export default async function handler(req, res) {
  var db;
  const albumArray = req.body.album;

  if (!db) {
    try {
      const mongoDB = process.env.MONGO_URL;
      mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

      db = mongoose.connection;

      // const insertManyRes = await db.collection("album_data").insertMany(albumArray);

      // const drop = await db.collection("album_data").drop();
      // console.log(insertManyRes)

      db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } catch (error) {
      console.log(error);
    }
  }

  if (1) {
    res.status(200).json({});
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
