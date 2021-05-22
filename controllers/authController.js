//Importing all Models
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secrete } = require("../keys");


exports.register = async (req, res) => {
    const { user_name, email, password } = req.body;
    let pathToImage = req.pathname + req.filename;
    console.log(pathToImage)
    if (!(user_name, email, password)) {
        return res.json({
            "message": "Enter all the fields"
        });
    }
    //Logging to Console
    console.log(req.body.user_name, req.body.email);
    bcrypt.hash(password, 10).then((hashedPassword) => {
        let user = new User({
            user_name,
            email,
            password: hashedPassword,
            profile_image: pathToImage
        });
        user.save((err, user) => {
            if (err) {
                return res.json({ err });
            }
            return res.json({
                "message": `${user.user_name} Account is Created Sucessfully`
            });
        });

    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.json({
            "message": "Please add all the Fields"
        });
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.json({
                "message": "Cannot find user account associated with this email"
            })
        }
        console.log(user._id)
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.json({ err });
            }
            const token = jwt.sign({ uid: user._id }, secrete);
            return res.json({ "messagee": "Sucessfully Logged In", token })
        });
    });
}


exports.forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.json({
            "message": "Please enter both the fields"
        });
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.json({
                "message": `${email} does not exist`
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                return res.json({
                    "message": "New Password cannot be the same as the old password"
                });
            }
            bcrypt.hash(password, 10).then((hashedPassword) => {
                User.findByIdAndUpdate({ _id: user._id }, { $set: { password: hashedPassword } }, (err, result) => {
                    if (err || !result) {
                        return res.json({
                            "message": "Cannot change password"
                        });
                    }
                    return res.json({
                        "message": "Password Changed Successfully, Do Not forget it"
                    });
                });
            });
        });

    });
}