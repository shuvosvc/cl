const express = require("express");

const router = express.Router();

const sequelize = require("../util/database");
const Authority = require("../models/authority");

var multer = require("multer");
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

///////////////////////////////////////
//CLOUDINARY

var cloudinary = require("cloudinary");
cloudinary.config({
  secure: true,
  api_key: process.env.CL_API_KEY,
  api_secret: process.env.CL_API_SECRET,
  cloud_name: "adnanshanto",
});

router.post("/", upload.single("image"), async function (req, res) {
  sequelize
    .sync()
    .then(async () => {
      //GEOCODER

      //CLOUDINARY UPLOAD
      const result = await cloudinary.uploader.upload(req.file.path);

      var image = result.secure_url;

      const { name } = req.body;

      const newAdmin = await Authority.create({
        name,
        image,
      });
      return res.status(200).json({
        state: "ok",
        newAdmin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        state: "INTERNAL_SERVER_ERROR",
      });
    });
});

module.exports = router;
