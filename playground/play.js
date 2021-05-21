const bcrypt = require("bcrypt");

const hashPassword = async (myPlaintextPassword, saltRounds) => {
    let hashPassword;
    await bcrypt.hash(myPlaintextPassword, saltRounds).then((hash) => { hashPassword = hash });
    console.log(hashPassword);
    return hashPassword
}


let hash = hashPassword("jerry", 10);
console.log("Hased", hash)

