const Url = require("../models/url");
const asyncHandler = require("express-async-handler");
const uniqid = require("uniqid");

exports.url_create = asyncHandler(async (req, res, next) => {
  const websiteUrl = req.body.link;
  const linkExists = await Url.findOne({ longUrl: websiteUrl }).exec();

  if (linkExists) {
    res.json(linkExists);
  } else {
    const newShortenedUrl = "http://localhost:5173/linkTo/" + uniqid().slice(-6);
    const url = new Url({ 
      longUrl: websiteUrl, 
      shortenedUrl: newShortenedUrl
    });
    await url.save();

    res.json(url);
  }
});

exports.url_get = asyncHandler(async (req, res, next) => {
  const longUrl = await Url.findOne({ shortenedUrl: `http://localhost:5173/linkTo/${req.params.vidId}` }).exec();
  res.json(longUrl.longUrl);
});