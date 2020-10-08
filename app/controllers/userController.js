const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')
const uploadMiddleware = require('../middlewares/uploads')


/* Models */
const File = mongoose.model('File');

// start user upload function 

let uploadCloudinary = (req, res) => {
    console.log(req.file) // to see what is returned to you

    const file = {};

    file.id = shortid.generate();
    file.public_id = req.file.public_id;
    file.url = req.file.url;

    File.create(file) // save image information in database

        .then(newFile => res.json(newFile))

        .catch(
            err => logger.error(err, 'userController.uploadCloudinary()', 8))
}

let showAllFiles = (req, res) => {
    File.find()
        .select('-__id -v')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: showAllFiles', 10)
                let apiResponse = response.generate(true, 'Failed To Find files', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: showAllFiles')
                let apiResponse = response.generate(true, 'No files Found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'All files found', 200, result)
                res.send(apiResponse)
            }
        });
}

// start of login function 
let downloadFile = (req, res) => {
    if (req.params.id || req.query.id) {
        File.findOne({ 'id': req.query.id || req.params.id }, (err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: downloadFile', 10)
                let apiResponse = response.generate(true, 'Failed To Find file', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No File Found', 'User Controller: downloadFile')
                let apiResponse = response.generate(true, 'No file Found', 404, null);
                res.send(apiResponse);
            } else {
                let url = result.url;
                let apiResponse = response.generate(false, 'File download success', 200, url)
                res.send(apiResponse)
            }
        })
    } else {
        let apiResponse = response.generate(true, 'ID Missing', 500, null)
        res.send(apiResponse)

    }
}

// end of the login function 


let logout = (req, res) => {

} // end of the logout function.


module.exports = {

    showAllFiles: showAllFiles,
    uploadCloudinary: uploadCloudinary,
    downloadFile: downloadFile,
    logout: logout

}// end exports