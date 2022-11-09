const mongoose = require("mongoose");

// Local imports
const TokenLogs = require("./schemas/TokenLogs");

// Export models
module.exports = mongoose.models.tokens || mongoose.model("tokens", TokenLogs);
