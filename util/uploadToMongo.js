import mongoose from "mongoose";
import { uploadToImgbb } from "./uploadToImgbb";

export default async function uploadToMongo(albumData, albumId) {
  console.log("starting to upload to mongo", albumData.length);
  try {
    var db;
    let toPushData = [];

    if (!db) {
      try {
        const mongoDB = process.env.MONGO_URL;
        mongoose.connect(mongoDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        db = mongoose.connection;
      } catch (err) {
        console.log("err connecting to db db");
        throw err;
      }
    }

    const uploadAndPushToMongo = async () => {
      await Promise.all(
        albumData.map(async (singleImageData, i) => {
          var album = await db.collection(albumId).findOne({ id: singleImageData.id });
          if (!album) {
            console.log("pushing new");
            const imgurData = await uploadToImgbb(singleImageData.baseUrl);
            albumData[i]["imgurData"] = imgurData;
            try {
              db.collection(albumId).insertOne(albumData[i]);
            } catch (err) {
              console.log("error pushing singledata to db", err);
            }
          } else {
            console.log("already available");
          }
        })
      );
    };
    await uploadAndPushToMongo();
    console.log("Response of pushing to db", "uploaded");
  } catch (err) {
    console.log(err);
    console.error("Error occured when pushing google data to mongo");
  }
}
