const path = require("path");
const multer = require("multer");


//This Function simulates the File Storage and store the files in ./uploads
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.pathname = "./uploads"
        console.log("Something");
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        req.filename = Date.now() + path.extname(file.originalname);
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});