require("dotenv").config();
// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  api_key: process.env.CL_API_KEY,
  api_secret: process.env.CL_API_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
uploadImage("./asset/3297839f77543b581c348df50912904e.jpg");
