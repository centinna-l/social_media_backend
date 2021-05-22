const redis = require('redis');
const { REDIS_PORT } = require("../keys");
const client = redis.createClient(REDIS_PORT);
client.on('connected', (_) => {
    console.log('Redis Connected');
});
client.on('error', (err) => {
    console.log(`${err}`);
});

module.exports = client;