import { createHeader } from "../../util/createHeader";
import uploadToMongo from "../../util/uploadToMongo";
import { getToken } from "./auth/getToken";

export default async function handler(req, res) {
  let albumId;
  if (process.env.IS_PROD === "YES") {
    albumId = process.env.BONKY_ALBUM_ID; //BONKY
  } else {
    albumId = process.env.TEST_ALBUM_ID; //test
  }
  var apiResponse = [];
  const tokens = await getToken();


  const googleCallAPI = async (pageToken) => {
    const requestOptions = await createHeader(tokens, pageToken, albumId);
    let response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems:search",
      requestOptions
    );
    response = await response.json();

    apiResponse = apiResponse.concat(response?.mediaItems);

    if (response["nextPageToken"]) {
      console.log("next page available, already fetched", apiResponse.length);
      await googleCallAPI(response["nextPageToken"]);
    }
  };

  try {
    await googleCallAPI();
    await uploadToMongo(apiResponse,albumId);
    return res.status(200).json({status: 'success'});
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json("blogData");
}
