require("dotenv").config();
const express = require("express");
const ImageModel = require("../models/image");

const router = express.Router();

router.post("/upload", async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).send({ message: "Image is mandatory for upload." });
  }

  const imageRecord = new ImageModel({ image });

  try {
    await imageRecord.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/fetch", async (req, res) => {
  const { image } = req.query;
  let query = {};
  if (image) {
    query = {
      image,
    };
  }
  ImageModel.find(query, (err, results) => {
    if (err) {
      res.send(err);
    }

    res.send(results);
  });
});

module.exports = router;
