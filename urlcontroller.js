// controllers/urlController.js
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = nanoid(8);

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      url = new Url({
        originalUrl,
        shortUrl,
      });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
};
