const client = require("../helper/redis_connections");
client.on('connect', (_) => {
    console.log("User Cache Connected");
});

client.on('err', (err) => {
    console.log(`${err}`);
});
module.exports = (req, res, next) => {
    const { username } = req.params;
    console.log('username: ', username);

    client.get(username, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json(JSON.parse(data))
        } else {
            next();
        }
    });
}