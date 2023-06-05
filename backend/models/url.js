const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  longUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true }
});

module.exports = mongoose.model("Url", UrlSchema);
