// Library imports
const Schema = require("mongoose").Schema;

const TokenLogs = new Schema(
  {
    access_token: { type: Schema.Types.Mixed },
    scope: { type: Schema.Types.Mixed },
    token_type: { type: Schema.Types.Mixed },
    id_token: { type: Schema.Types.Mixed },
    expiry_date: { type: Schema.Types.Mixed },
    refresh_token: { type: Schema.Types.Mixed }
  },
  { versionKey: false }
);

module.exports = TokenLogs;
