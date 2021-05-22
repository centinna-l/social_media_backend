const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require("./keys");
const PORT = 8000;
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const sendRequestRoutes = require("./routes/send-requests");
const listPeopleRoutes = require("./routes/listPeople");

mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log("MongoDB is connected");
});

mongoose.connection.on('error', () => {
    console.log("Cannot establish connection to DB at the moment");
});

app.use(express.json());

//Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/sr', sendRequestRoutes);
app.use('/api/people', listPeopleRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.get('/', (req, res) => {
    res.json({
        "message": "Server Is and Running"
    });
});

app.listen(PORT, () => {
    console.log(`Running on Port:${PORT}`);
});