/* 
Creator: Justina Bui
Date: 11/16/2020
Copied from info_server_Ex4.js from Lab 13 Exercise 4
*/

//Copied from Lab 13 to generate Server Side Processing using Express
var data = require('./public/product_data.js'); // Link to my product_data.js 
var products_array = data.products; // Put my products from product_data.js into an array (list of items)
const querystring = require('querystring'); //the server will to all errors
var express = require('express'); // Starts a new Express application
var app = express(); // Begins Express, put module into app 
var myParser = require("body-parser"); // Gives access to post data 

app.all('*', function (request, response, next) { //link to my request method of POST
    console.log(request.method + ' to ' + request.path); //write the request and path 
    next(); //continue the process 
});

app.use(myParser.urlencoded({ extended: true })); //get data 

app.post("/process_form", function (request, response) {
    let POST = request.body;


    //copied from Capaldo, J. in ITM 352 
    //determines if the quantities are NonNeg Int 
    if (typeof POST['submitPurchase'] != 'undefined') {
        response.send("Invalid Entry!");
    }
    let validQuantities = []; //add an array to check all quantities
    let hasErrors = false;
    for (i in products) {
        qty = POST[`quantity${i}`];
        if (qty != '' || qty > 0) validQuantities.push(isNonNegInt(qty)); // if both a quantity over 0 and valid
    }
    hasErrors = validQuantities.includes(false);
    const stringified = querystring.stringify(POST);// if all quantities are valid invoice is generated
    if (validQuantities.length != 0 && !hasErrors) {
        response.redirect("./invoice.html?" + stringified);
    }
    else { response.send('Enter a valid quantity!') } // if quantities are not valid send message
});
    //copied from Capaldo, J. in ITM 352 

//check the isNonNegInt function 
function isNonNegInt(q, returnErrors = false) {
    errors = [];
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if the string a new number
    if (q < 0) errors.push('Negative value!'); //check if value is not negative / is positive
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is an integar 
    return returnErrors ? errors : (errors.length == 0);
}

//Professor Port helped me understand where to format the code so my server will listen on port 8080
app.use(express.static('./public')); //looks for files in the public directory (make a get request, look into public and see if it has the file)
app.listen(8080, () => console.log(`listening on port 8080`)); // start server on local host
