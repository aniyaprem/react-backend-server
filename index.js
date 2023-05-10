const express = require('express')
var colors = require('colors')
require('dotenv').config();
const connectionDB = require('./db/config');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const errorHandler = require('./middleware/errorHandler')
const router = require('./router/index')
connectionDB();

const User = require('./model/User')

const port = process.env.PORT;
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(cors());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(fileUpload());
app.use(router);
app.use(errorHandler);

// process.on('unhandledRejection', e => {}); //unhandled promise rejections
// process.on('uncaughtException', e => {}); //unhandled errors

const server = app.listen(port, ()=>{
    console.log(`Server started on ${port}!`.blue.bold);
});
//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise)=>{
    console.log(`ApplicationError: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});

