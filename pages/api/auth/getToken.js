import mongoose from "mongoose";
import { TokenLogs } from "../../../models";
import { gererateAccessToken } from "./refreshToken";

var db;
var tokenData = {};

if (!db) {
  try {
    const mongoDB = process.env.MONGO_URL;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

    db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } catch (error) {
    console.log(error);
  }
}

export const getToken = async () => {
  tokenData = await TokenLogs.findOne();
  try {
    if (tokenData.expiry_date - Date.now() < 1000) {
      console.log("refreshing");
      const refreshedTokens = await gererateAccessToken(tokenData.refresh_token);
      try {
        await TokenLogs.updateOne({ _id: mongoose.Types.ObjectId(tokenData._id.toString()) }, refreshedTokens);
      } catch (err) {
        console.log(err);
      }
      return refreshedTokens;
    }
  } catch (err) {
    console.log("error creating refresh token:", err);
  }
  return tokenData;
};
