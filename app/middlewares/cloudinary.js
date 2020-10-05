const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'dalrrzumu',
    api_key: '149977324717516',
    api_secret: 'UVJDPZwz1uPzob8BknCpqeZ_EkE'
    });
    const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png", "pdf"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    const parser = multer({ storage: storage });

let uploadCloudinary=(parser);

module.exports={
    uploadCloudinary:uploadCloudinary
}