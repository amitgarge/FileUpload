const util = require('util');
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage")
const mongoose = require('mongoose')



var storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/mediaFiles",
    options: { useNewUrlParser: true, useUnifiedTopology: true },

    file: (req, file) => {
        const match = ["image/png", "image/jpeg"]

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-koder-${file.originalname}`;
            return filename
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-koder-${file.originalname}`
        }
    }
})

var uploadFile = multer({ storage: storage }).single("file");
var uploadFileMiddleware = util.promisify(uploadFile)

module.exports = {
    uploadFileMiddleware: uploadFileMiddleware
}