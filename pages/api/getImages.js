let MongoClient = require("mongodb").MongoClient;

export default async function handler(req, res) {
  let albumId;
  if (process.env.IS_PROD === "YES") {
    albumId = process.env.BONKY_ALBUM_ID; //BONKY
  } else {
    albumId = process.env.TEST_ALBUM_ID; //test
  }

  MongoClient.connect(process.env.MONGO_URL, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("gphotos");
    const result = await dbo.collection(albumId).find().toArray();
    console.log(result);
    res.json(result);
  });
}

