const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const merchantRoutes = require('./routes/merchant.route');
const userRoutes = require('./routes/user.route');
const transactionRoutes = require('./routes/transaction.route');
const cardRoutes = require('./routes/card.route');
const statusError = require('./config/statusError');

const app = express();
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = ('mongodb://localhost:27017/coreBank');

const mongoDB = dev_db_url;
const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
// try {
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
// } catch (err) {
//     res.send({ statusCode: statusError.statusCode.methodNotAllowed, message: "please enter valid Json" })
// }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/merchants', merchantRoutes);
app.use('/user', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/cards', cardRoutes);

let port = 3000;

app.listen(port, () => {
    console.log('*******************************************************');
    console.log('Server is up and running on port numner ' + port);
    console.log('*******************************************************');
});