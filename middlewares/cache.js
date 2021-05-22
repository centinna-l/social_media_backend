// const redis = require("redis");
//const client = redis.createClient(6379);
const client = require("../helper/redis_connections");
client.on('connect', (_) => {
    console.log("Connected");
});

client.on('err', (err) => {
    console.log(`${err}`);
});
module.exports = (req, res, next) => {
    const id = req.params.aid;
    console.log('ID', id)

    client.get(id, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json(JSON.parse(data))
        } else {
            next();
        }
    });
}