/* Author: Justina Bui
Reference: info_server_Ex4.js from Lab 13 Exercise 4 and Lab 14 File I/O
Title: Assignment 2*/

//Copied from Lab 13 to generate Server Side Processing using Express
var data = require('./public/product_data.js'); // Link to my product_data.js to get data
var products = data.products; // Put my products from product_data.js into an array (list of items)

//Use Querystring to get variable values 
const queryString = require('querystring'); //the server will to all errors
var filename = 'user_data.json' //setting a variable to retrieve user data and store it there
var fs = require('fs'); //file system loading

// Express = Node.js will connect with the http module
var express = require('express'); // Starts a new Express application
var app = express(); // Begins Express, put module into app 
var myParser = require("body-parser"); // Gives access to post data 

// Assignment 2 Component
if (fs.existsSync(filename)) { //checks if the file already exists in the path
    stats = fs.statSync(filename) //tells us what the file stats are
    data = fs.readFileSync(filename, 'UTF-8'); //setting up the data to check if file exists
    console.log(typeof data); //see what type it is; ex. String, Object, String Object
    users_reg_data = JSON.parse(data); //setting up another variable to link it to the data

    console.log(`${filename} has ${stats.size} characters`); // tells us what the word count is (in console, it will report it)
} else {
    console.log("Hello! Sorry..." + filename + 'does not exist!'); //when there is no file name of such, it will send this notice
}

// Invoice, it will check if quantities are valid or take user back to order webpage
// Reference: https://www.geeksforgeeks.org/express-js-app-all-function/
app.all('*', function (request, response, next) { //link to my request method of POST
    console.log(request.method + ' to ' + request.path); //write the request and path 
    next(); //continue the process 
});

app.use(myParser.urlencoded({ extended: true })); //get data from the body 


//Copied from Yamamoto, R. 
//Example from Lab 13 Exercise 4 
//Checks if order page was valid = take data from querystr to transfer in Invoice 
app.post("/process_purchase", function (request, response) {
    //check for valid quantities and look up request.query
    let POST = request.body;
    if (typeof POST['submitPurchase'] != 'undefined') { //reply undefined if info does not match 
        var has_valid_qtys = true; //assumes that quantity is invalid 
        var has_qtys = false; //assumes that quantity is valid
        //create a loop to ensure quantities are valid
        for (var i = 0; i < products.length; i++) {
            var qty = POST[`quantity${i}`];
            has_qtys = has_qtys || qty > 0
            has_valid_qtys = has_valid_qtys && isNonNegInt(qty);
        }
        //if qtys are good, create an invoice 
        const stringified = queryString.stringify(POST);
        if (has_valid_qtys && has_qtys) {
            //redirect to login
            response.redirect("./login.html?" + stringified);
            return; //stops the function 
        } else {
            //if not ready, go back to order page 
            response.redirect("./order_display.html?" + stringified);
        }
    }
});

//Create a way to process a user login 
//Process login from POST
app.post("/process_login", function (request, response) {
    var login_error = []; //define login error
    console.log(request.query); //see what the request outputs 
    var the_username = request.body.username.toLowerCase(); //request to make it lowercase

    //From the JSON file, check if username is there
    if (typeof users_reg_data[the_username] != 'undefined') { //return undefined if username does not match 

        //Check if the username exists in json data
        if (users_reg_data[the_username].password == request.body.password) { //passwords should match 
            request.query.username = the_username;
            //Double check in the console if it worked 
            console.log(users_reg_data[request.query.username].name);
            request.query.name = users_reg_data[request.query.username].name
            //Redirect to Invoice if log in was successful 
            response.redirect('./invoice.html?') + querystring.stringify(request.query);
            return;
            //Redirect if log in was no successful 
        } else {
            console.log(login_error);
            request.query.username = the_username;
            request.query.name = users_reg_data[the_username].name;
            request.query.login_error = login_error.join(';');
        }
        //Specifically, tell user that the username was invalid 
    } else {
        login_error.push = ('Username is Invalid'); //reply with this message
        request.query.login_error = login_error.join(';');
    }
    //redirect user to the login page to try again 
    response.redirect('./login.html?') + queryString.stringify(request.query);
});

//Process Registration Page
app.post("/process_registration", function (request, response) {
    let POST = request.body; //get data 
    console.log(request.query);
    var errors = [];

    // Reference to the alphabet code: http://www.tutorialspark.com/javascript/JavaScript_Regular_Expression_Form_Validation.php
    //Full name format to have alphabet letters only
    if (/^[A-Za-z]+$/.test(POST['name']) || (POST['name'] != "undefined")) { //No response if name is okay
        console.log('Name is Valid'); //check in the console 
    }
    else { //When name does not have valid input 
        errors.push('Please use Letters ONLY for Full Name') //push array error
    }
    //Username Guidelines (min 4 characters, max 10 characters)
    if ((/.{3,10}/.test(POST['username'])) && (/^[a-zA-Z0-9]*$/.test(POST['username']))) {
        console.log('Username is Valid'); //Check in the console 
    } else {
        errors.push('Username must have at least 4 characters, try again'); //push array error

        //Username Guidelines (must be original and unique)
        var reg_user = POST['username'].toLowerCase(); //form a case insensitive
        if (typeof users_reg_data[reg_user] != 'undefined') { //if username is already created in reg data
            errors.push('Username is already taken. Please enter a New Username.') //push error to array
        } else {
            console.log('New Username Here'); //check in the console 
        }

        //Email Guidelines
        //Determine email validation 
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(POST['email'])) {
            console.log('Email is Valid'); //check in the console
        } else { //Send an Error if email does not meet requirement
            errors.push('Email is invalid, try again') //push to errors array
        }

        //Password Guidelines + Information Validation 
        //Determine if password meets the 6 character requirement
        if (POST['password'].length < 6) { //if password does not meet the 6 characters requirement
            errors.push('Password is too Short, try again!') //push error to array
        } else {
            console.log('Password was successful!');
        }
        //Check if password matches 
        if (POST['password'] == POST['repeat_pws']) {
            console.log('Password is valid'); //check if the statement functions
        } else {
            errors.push('Password is invalid, try again') //push error to array
        }

        //Go to the user's account if everything matches and no errors were found 
        if (errors.length == 0) {
            console.log('No Errors Found');
            //Using the POST, the JSON file will register the user infomation
            //establish variables for my section errors
            fs.writeFileSync(filename, data, "utf-8");
            var username = POST["username"];
            user_data[username] = {};
            user_data[username].name = POST['newname'];
            user_data[username].password = POST['password'];
            user_data[username].email = POST['email'];
            users_reg_data = JSON.stringify(user_data);
            //When order is placed, refirect to Invoice page
            response.redirect('./invoice.html?' + queryString.stringify(request.query));
        }
        //When in doubt, tell user that there were errors and to try again 
        if (errors.length > 0) {
            console.log(errors); //indicate what errors were there
            response.send('Please review input, errors were found' + errors + " ");
        }
    }
});

//Log-in Application; creating a checkout process form for invoice 
app.post("/process_form", function (request, response) {
    let POST = request.body; //get data from body 
    //Creating a loop when the input given is undefined 
    if (typeof POST['checkout'] != 'undefined') {
        var has_valid_qtys = true; //assumes that quantity is invalid 
        var has_qtys = false; //assumes that quantity is valid
        //create a loop to ensure quantities are valid
        for (var i = 0; i < products.length; i++) {
            var qty = POST[`quantity${i}`];
            has_qtys = has_qtys || qty > 0
            has_valid_qtys = has_valid_qtys && isNonNegInt(qty);
        }
        //if qtys are good, create an invoice 
        const stringified = queryString.stringify(POST);
        if (has_valid_qtys && has_qtys) {
            //redirect to login
            response.redirect("./login.html?" + stringified);
        } else {
            //if not ready, go back to order page 
            response.redirect("./order_display.html?" + stringified);
        }
    }
});

//Send user to login page when quantity is valid 
//check for NonNeg Int again 
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume quantity is valid 
    if (q == "") { q = 0; } //blank values = 0
    if (Number(q) != q) errors.push('This is Not a Number!'); //check if value is a number
    if (q < 0) errors.push('This is a Negative Value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('This is Not an Integer!'); //check if value is a whole, real number
    return returnErrors ? errors : (errors.length == 0);
}

//Professor Port helped me understand where to format the code so my server will listen on port 8080
app.use(express.static('./public')); //looks for files in the public directory (make a get request, look into public and see if it has the file)
app.listen(8080, () => console.log(`listening on port 8080`)); // start server on local host
