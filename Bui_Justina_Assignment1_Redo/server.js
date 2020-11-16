/* 
Creator: Justina Bui
Date: 11/11/2020
Copied from info_server_Ex4.js from Lab 13 Exercise 4
*/

//Copied from Lab 13 to generate Server Side Processing using Express//
var express = require('express'); // Express package //
var app = express(); // Begin // 
var myParser = require("body-parser"); // Gives access to post data // 
var data = require('./public/product_data.js'); // Link to my product_data.js // 
var products = data.products; // Correlates to my products_array // 
var fs = require('fs'); // Get data from my product_data.js file //

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(express.static('./public')); //looks for files in the public directory (make a get request, look into public and see if it has the file)
app.use(myParser.urlencoded({ extended: true }));

app.post("/process_form", function (request, response) {
    let POST = request.body;
    process_quantity_form(POST, response);
});

function process_quantity_form (POST, response) {
    if (typeof POST['purchase_submit_button'] != 'undefined') {
       var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
       receipt = '';
        for(i in products) { 
            let q = POST[`quantity_textbox${i}`];
            let model = products[i]['model'];
            let model_price = products[i]['price'];
            if (isNonNegIntString(q)) {
            receipt += eval('`' + contents + '`'); // render template string
            } else {
            receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
            }
        }
      response.send(receipt);
      response.end();
    }
 }

// Copied from is NonNegInt function from Lab 13 Exercise 4// 
function isNonNegIntString (string_to_check, returnErrors=false){
errors = []; // assume no errors at first
if(Number(string_to_check) != string_to_check) {errors.push('Not a number!');} // Check if string is a number value
if(string_to_check < 0) errors.push('Negative value!'); // Check if it is non-negative
if(parseInt(string_to_check) != string_to_check) errors.push('Not an integer!'); // Check that it is an integer

return returnErrors ? errors : (errors.length == 0);
}

app.listen(8080, () => console.log(`listening on port 8080`)); // start server on local host
