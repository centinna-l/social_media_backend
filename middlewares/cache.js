// const redis = require("redis");
//const client = redis.createClient(6379);
const client = require("../helper/redis_connections");
client.on('connect', (_) => {
    console.log("Cache Connected");
});

client.on('err', (err) => {
    console.log(`${err}`);
});
module.exports = (req, res, next) => {
    const { uid } = req.params;
    console.log('ID', uid)

    client.get(uid, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json(JSON.parse(data))
        } else {
            next();
        }
    });
}