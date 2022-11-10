import mongoose from "mongoose";
import { linkToB64 } from "./linkToB64";

export default async function uploadToMongo(albumData, albumId) {
  try {
    var db;

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
          }
        })
      );
    };

    const pushToDB = async () => {
      // try {
      //   const drop = await db.collection(albumId).deleteMany({});
      //   console.log("drop response:", drop);
      // } catch {
      //   console.log("album doesnt exist");
      // }

      const insertManyRes = await db.collection(albumId).insertMany(albumData);

      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      return insertManyRes;
    };
    await addBase64();
    const apiRes = await pushToDB();
    console.log("Response of pushing to db", apiRes);
  } catch(err) {
    console.log(err)
    console.error("Error occured when pushing google data to mongo");
  }
}
