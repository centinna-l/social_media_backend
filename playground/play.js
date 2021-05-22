// const bcrypt = require("bcrypt");

// const hashPassword = async (myPlaintextPassword, saltRounds) => {
//     let hashPassword;
//     await bcrypt.hash(myPlaintextPassword, saltRounds).then((hash) => { hashPassword = hash });
//     console.log(hashPassword);
//     return hashPassword
// }


// let hash = hashPassword("jerry", 10);
// console.log("Hased", hash)


const redis = require("redis");
const client = redis.createClient(6379);

client.on('connect', (_) => {
    console.log("Connected");
});

client.on('err', (err) => {
    console.log(`${err}`);
});

console.log(client)
