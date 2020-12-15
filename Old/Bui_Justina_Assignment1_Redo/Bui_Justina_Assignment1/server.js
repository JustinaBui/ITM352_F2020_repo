/* 
Creator: Justina Bui
Date: 11/5/2020
Copied from info_server_Ex4.js from Lab 13
Server File
*/

// Code for Server Side Processing 
var express = require('express'); // express package
var app = express(); // begin the express
var myParser = require("body-parser"); // compiler of data into separate entities
var data = require('./public/product_data.js'); //retrieve product data from JavaScript file
var products_array = data.products; // puts 'products_array' in products_data.js file
var queryString = require('./public/node_modules/query-string');
var fs = require('fs'); // retrieve data from product_data.js

app.all('*', function (request, response, next) { //for all request methods
    console.log(request.method + ' to ' + request.path); //write the request method and path in the console
    next(); //continue
});

app.use(myParser.urlencoded({ extended: true })); //retrieve data in the body
app.post("/process_purchase", function (request, response) {
    let POST = request.body; // data compiled in the body

    //check if quantities are nonnegative integers 
    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // develop a variable to assume that it will be true
        var hasquantities = false
        for (i = 0; i < products.length; i++) {

            qty = POST[`quantity${i}`];
            hasquantities = hasquantities || qty > 0; // If the value bigger than 0 then it is okay
            hasvalidquantities = hasvalidquantities && isNonNegInt(qty); // if both the quantity is over 0 and valid    
        }
        // consider if all quantities are valid and will generate an invoice// 
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./invoice.html?" + stringified); // with the invoice.html file is the input
        }
        else {
            response.redirect("./products_display.html?" + stringified)
        }
    }
});

//isNonNegInt function from Lab 13
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integer
    return returnErrors ? errors : (errors.length == 0);
}

app.use(express.static('./public'));
// source of 'public' directory that express serves files from here//

app.listen(8080, () => console.log(`listening on port 8080`));
//run the server on port 8080 and writes 'node server.js' in the console//
