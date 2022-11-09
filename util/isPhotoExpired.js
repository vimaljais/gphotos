import mongoose from "mongoose";

export default async function isPhotoExpired(albumId) {
  let validToken = false;

  try {
    var db;

    if (!db) {
      try {
        const mongoDB = process.env.MONGO_URL;
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        db = mongoose.connection;
        db.on("error", console.error.bind(console, "MongoDB connection error:"));

        let currentTime = new Date().getTime();
        let expiryTime = 0;

        try {
          const response = await db.collection("album_expiry").findOne({ album_id: albumId });
          if (response === null) {
            throw "No album found";
          }
          expiryTime = response.expiry;
        } catch (err) {
          console.log(err);
        }

        if (currentTime > expiryTime) {
          return validToken;
        } else {
          validToken = true;
          return validToken;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    console.log("Response of getting expiry time", apiRes);
  } catch {
    console.error("Error occured when pushing google data to mongo");
  }
}
