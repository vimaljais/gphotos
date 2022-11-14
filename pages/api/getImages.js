let MongoClient = require("mongodb").MongoClient;

export default async function handler(req, res) {
  let albumId;
  if (process.env.IS_PROD === "YES") {
    albumId = process.env.BONKY_ALBUM_ID; //BONKY
  } else {
    albumId = process.env.TEST_ALBUM_ID; //test
  }

  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  const dbo = client.db("gphotos");

  const result = await dbo.collection(albumId).find().toArray();
  res.json(result);
}
