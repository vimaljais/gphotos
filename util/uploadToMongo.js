import mongoose from "mongoose";
import { linkToB64 } from "./linkToB64";

export default async function uploadToMongo(albumData, albumId) {
  try {
    var db;
    let toPushData = [];

    if (!db) {
      try {
        const mongoDB = process.env.MONGO_URL;
        mongoose.connect(mongoDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        db = mongoose.connection;
      } catch (err) {
        console.log("err connecting to db db");
        throw err;
      }
    }

    const addBase64 = async () => {
      await Promise.all(
        albumData.map(async (singleImageData, i) => {
          var album = await db
            .collection(albumId)
            .findOne({ id: singleImageData.id });
          if (!album) {
            const b64 = await linkToB64(singleImageData.baseUrl);
            albumData[i]["img64"] = b64;
            toPushData.push(albumData[i]);
          }
        })
      );
    };

    const pushToDB = async () => {
      const insertManyRes = await db.collection(albumId).insertMany(toPushData);

      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      return insertManyRes;
    };
    await addBase64();
    let apiRes = "";
    if (toPushData.length > 0) {
      apiRes = await pushToDB();
    }
    else {
      apiRes ="nothing to push"
    }
    console.log("Response of pushing to db", apiRes);
  } catch (err) {
    console.log(err);
    console.error("Error occured when pushing google data to mongo");
  }
}
