import mongoose from "mongoose";

export default async function updateMongo(albumData, albumId) {
  try {
    var db;
    const pushToDB = async () => {
      if (!db) {
        try {
          const mongoDB = process.env.MONGO_URL;
          mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

          db = mongoose.connection;

          let albumExpiryTime = new Date();
          albumExpiryTime.setMinutes(albumExpiryTime.getMinutes() + 50);

          try {
            const drop = await db.collection(albumId).deleteMany({});
            console.log("drop response:", drop);
          } catch {
            console.log("album doesnt exist");
          }
          const insertManyRes = await db.collection(albumId).insertMany(albumData);
          if (insertManyRes.acknowledged) {
            try {
              const updatedAlbumExpiry = await db
                .collection("album_expiry")
                .findOneAndUpdate(
                  { album_id: albumId },
                  { $set: { album_id: albumId, expiry: albumExpiryTime.getTime() } },
                  { upsert: true, new: true, setDefaultsOnInsert: true }
                );
              console.log("updated expiry time", updatedAlbumExpiry);
            } catch (err) {
              console.log("updated expiry time failed", err);
            }
          }

          db.on("error", console.error.bind(console, "MongoDB connection error:"));
          return insertManyRes;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    };

    const apiRes = await pushToDB();
    console.log("Response of pushing to db", apiRes);
  } catch {
    console.error("Error occured when pushing google data to mongo");
  }
}
