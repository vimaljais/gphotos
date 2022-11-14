

import mongoose from "mongoose";
let MongoClient = require("mongodb").MongoClient;

import { gererateAccessToken } from "./refreshToken";

var tokenData = {};

export const getToken = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }
  const dbo = client.db("gphotos");
  tokenData = await dbo.collection("tokens").findOne();

  try {
    if (tokenData.expiry_date - Date.now() < 1000) {
      console.log("refreshing");
      const refreshedTokens = await gererateAccessToken(tokenData.refresh_token);
      try {
        await dbo
          .collection("tokens")
          .updateOne({ _id: mongoose.Types.ObjectId(tokenData._id.toString()) }, refreshedTokens);
      } catch (err) {
        console.log(err);
      }
      return refreshedTokens;
    } else {
      return tokenData;
    }
  } catch (err) {
    console.log("error creating refresh token:", err);
  }
  return tokenData;
};
