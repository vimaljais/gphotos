import { createHeader } from "../../util/createHeader";
import getImagesFromMongo from "../../util/getImagesFromMongo";
import isPhotoExpired from "../../util/isPhotoExpired";
import updateMongo from "../../util/updateMongoFromGoogle";
import { getToken } from "./auth/getToken";

export default async function handler(req, res) {
  // const albumId= process.env.BONKY_ALBUM_ID //BONKY
  const albumId = process.env.TEST_ALBUM_ID; //test

  const tokens = await getToken();
  var apiResponse = [];

  const googleCallAPI = async (pageToken) => {
    const requestOptions = await createHeader(tokens, pageToken, albumId);
    let response = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", requestOptions);
    response = await response.json();

    apiResponse = apiResponse.concat(response?.mediaItems);

    if (response["nextPageToken"]) {
      console.log("next page available, already fetched", apiResponse.length);
      await googleCallAPI(response["nextPageToken"]);
    }
  };

  try {
    const albumNotExpired = await isPhotoExpired(albumId);

    if (albumNotExpired) {
      console.log("images available in mongo");
      apiResponse = await getImagesFromMongo(albumId);
    } else {
      await googleCallAPI();
      updateMongo(apiResponse, albumId);
    }

    res.status(200).send(apiResponse);
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Unauthorized", error: err });
  }
}
