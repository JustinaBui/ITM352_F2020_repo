var express = require('express');
var app = express();
var myParser = require("body-parser");
const fs = require('fs');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

const user_data_filename = 'user_data.json';

// check if file exists before reading
if (fs.existsSync(user_data_filename)) {
    stats = fs.statSync(user_data_filename);
    console.log(`user_data.json has ${stats['size']} characters`);


    var data = fs.readFileSync(user_data_filename, 'utf-8');
    users_reg_data = JSON.parse(data);
}

app.use(myParser.urlencoded({ extended: true }));

