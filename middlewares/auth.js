const jwt = require("jsonwebtoken");
const { secrete } = require("../keys");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    //get token from the header
    const token = req.header("x-auth-token");
    //Check if not token
    if (!token) {
        return res.status(401).json({
            msg: "Permission Denied",
        });
    }
    try {
        const decoded = jwt.verify(token, secrete);
        // console.log("Decoded JWT")
        // console.log(decoded.uid)
        req.uid = decoded.uid;

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            msg: "Permission Denied",
        });
    }
};

