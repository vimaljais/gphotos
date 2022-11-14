// import { connection, Schema } from "mongoose";

// /*
//  * Define Schemas as you used to
//  */
// const ConvForUserSchema = new Schema(
//   {
//     id: { type: Schema.Types.Mixed },
//     productUrl: { type: Schema.Types.Mixed },
//     baseUrl: { type: Schema.Types.Mixed },
//     mimeType: { type: Schema.Types.Mixed },
//     mediaMetadata: { type: Schema.Types.Mixed },
//     filename: { type: Schema.Types.Mixed },
//     imgurData: { type: Schema.Types.Mixed }
//   },
//   {
//     versionKey: false,
//     strict: false
//   }
// );

// /*
//  * Define the dynamic function
//  */
// const models = {};
// export const getModel = (collectionName) => {
//   if (!(collectionName in models)) {
//     models[collectionName] = connection.model(collectionName, ConvForUserSchema, collectionName);
//   }
//   return models[collectionName];
// };
