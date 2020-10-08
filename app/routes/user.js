const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const parser = require('../middlewares/cloudinary')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/file`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/upload`, parser.uploadCloudinary.single("image"), userController.uploadCloudinary);  

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/file/upload api for file Uploading.
     *
     * @apiParam {File} File to be uploaded. (body params) (required) * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "File Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.get(`${baseUrl}/download/:id`, userController.downloadFile);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.get(`${baseUrl}/all`, userController.showAllFiles);
}