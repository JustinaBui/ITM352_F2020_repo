/* Author: Justina Bui
Reference: info_server_Ex4.js from Lab 13 Exercise 4 and Lab 14 File I/O
Title: Assignment 2*/

//Copied from Lab 13 to generate Server Side Processing using Express
var data = require('./public/product_data.js'); // Link to my product_data.js to get data
var products = require("./public/product_data.js"); // Put my products from product_data.js into an array (list of items)

//Use Querystring to get variable values 
const querystring = require('querystring'); //the server will to all errors
var filename = 'user_data.json' //setting a variable to retrieve user data and store it there
var fs = require('fs'); //file system loading

// Express = Node.js will connect with the http module 
var express = require('express'); // Starts a new Express application
var app = express(); // Begins Express, put module into app 
var myParser = require("body-parser"); // Gives access to post data 

var qs = require('querystring'); //quantities to be carried over
var qstr = {};

// Invoice, it will check if quantities are valid or take user back to order webpage
app.all('*', function (request, response, next) { //link to my request method of POST
    console.log(request.method + ' to ' + request.path); //write the request and path 
    next(); //continue the process 
});

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

app.use(myParser.urlencoded({ extended: true })); //get data from the body 

//Login-in Application (how users will access the log in component)
app.post("/process_page", function (request, response) {
    //check for valid quantities and look up request.query
    console.log(request.body);
    var params = request.body; //params is an object and short for parameters; will route the properties
    if (typeof params['purchase_submit'] != 'undefined') { //reply undefined, if info does not match
        has_errors = false; // assume that quantity is valid
        total_qty = 0; // check for values and if total > 0
        for (i = 0; i < products.length; i++) {
            console.log(i, params[`quantity${i}`]);
            if (typeof params[`quantity${i}`] != 'undefined') {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // check if there is invalid data
                }
            }
        }
        qstr = querystring.stringify(request.body); //send data to web server
        // redirect to invoice page
        if (has_errors || total_qty == 0) {

            //redirect to product display page if quantity is invalid
            console.log("redirecting to product display page", has_errors, total_qty);
            response.redirect("/products_display.html?" + qstr);

        } else { //the quantity data is valid for invoice
            console.log("redirecting to login page");
            response.redirect("/login.html?" + qstr);
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

fs = require('fs'); //Use file system

//If the file exists, open the file. If it does not, it will not open
if (fs.existsSync(filename)) { //concurrent checking if file already exists
    stats = fs.statSync(filename) //retrieve stats from filename 
    data = fs.readFileSync(filename, 'UTF-8');
    console.log(typeof data); //check what kind of data it is
    users_reg_data = JSON.parse(data); //exchange data from web server
}
//set isNonNegInt for color check 
function isNonNegInt(q, return_errors = false) {
    errors = [];
    if (q == '') q = 0;
    if (Number(q) != q) errors.push('<font color="red">Please put a number.</font>'); //check if value is a number
    else if (q < 0) errors.push('<font color="red">Please put a positive value.</font>'); //check if value is a positive number
    else if (parseInt(q) != q) errors.push('<font color="red">Please put a whole number.</font>'); //check if value is a whole, real number
    return return_errors ? errors : (errors.length == 0);
}

app.post("./check_login", function (request, response) {
    //Process login form POST
    console.log(request.query, request.body);//get data from the body 
    the_username = request.body.username; //get data for username
    console.log(the_username, "username is", typeof (users_reg_data[the_username])); //write in the console, what is showing

    //Validate Login Data
    theQtyQuerystring = qs.stringify(request.query);
    if (typeof users_reg_data[the_username] != 'undefined') { //return undefined if username does not match 

        //Check if the username exists in json data
        if (users_reg_data[the_username].password == request.body.password) { //passwords should match 

            //Developed a querystring for invoice
            response.redirect('./invoice.html' + theQtyQuerystring + `&username=${the_username}`);
            return;
        } else {
            response.redirect('./invoice.html' + theQtyQuerystring); // redirect to login page when login is invalid
        }
    }
    response.send(`${username} registered!`); //when it does work, user will be registered
    response.redirect('./invoice.html' + theQtyQuerystring + `&username=${the_username}`); // redirect to login page when login is invalid
});

app.post("/register_user", function (request, response) { //Use Post Method, data will not display in URL
    //Create a register form
    console.log(request.query, request.body);
    the_username = request.body.username.toLowerCase(); //request to make it lowercase
    console.log(the_username, "username is", typeof (users_reg_data[the_username]));
    username = request.body.username;//saves new username to "users_reg_data" filename
    theQtyQuerystring = qs.stringify(request.query); // state querystring variable

    //establish variables for my section errors
    var errors = []; //record all errors
    var nameerrors = []; //record all name errors
    var usererrors = []; //record username errors
    var passerrors = []; //record password errors
    var confirmerrors = []; //record confirm password errors
    var emailerrors = []; //record email errors

    //Reference to Lab 11: https://dport96.github.io/ITM352/morea/120.functions/experience-functions.html
    
    //Name Check 
    if (request.body.name == "") { //when no name is given
        nameerrors.push('Full Name is invalid'); //reply with this message and push name error
        errors.push('Full Name is invalid') //push to array error
    }
    //Full name should not exceed 35 characters
    if ((request.body.name.length > 35)) { //When name length is greater than 35
        nameerrors.push('Full Name is too Long, try again!') //reply with this message and push name errors
        errors.push('Full Name is too Long, try again!') //push array error
    }

    // Reference to the alphabet code: http://www.tutorialspark.com/javascript/JavaScript_Regular_Expression_Form_Validation.php

    //Full name format to have alphabet letters only
    if (/^[A-Za-z]+$/.test(request.body.name)) { //No response if name is okay
    }
    else { //When name does not have valid input 
        nameerrors.push('Please use Letters ONLY for Full Name') //reply with this message and push name errors
        errors.push('Please use Letters ONLY for Full Name') //push array error
    }
    //Username Guidelines (min 5 characters, max 10 characters)
    if ((request.body.username.length < 5)) { //push an error if username is less than 5
        usererrors.push('Username is too Short, try again!') //reply with this message and push username errors array
        errors.push('Username is too Short, try again!') //push error to array
    }
    if ((request.body.username.length > 10)) { //push an error if username is over 10
        usererrors.push('Username is too Long, try again!') //reply with this message and push username errors array
        errors.push('Username is too Long, try again!') //push error to array
    }

    //Determine if username exists (all usernames should be unique)
    var reg_user = request.body.username.toLowerCase(); //form a case insensitive
    if (typeof users_reg_data[reg_user] != 'undefined') { //if username is already created in reg data
        usererrors.push('Username is already taken. Please enter a New Username.') //reply with this message and push username errors array
        errors.push('Username is already taken. Please enter a New Username.') //push error to array
    }
    //Username Information check to have letters and numbers ONLY
    //Found this online on how to type the code the test to have letters and numbers validation 
    if (/^[0-9a-zA-Z]+$/.test(request.body.username)) { //No response if name is okay
    }
    else { //send error if it does not meet requirements
        usererrors.push('Please use Letters and Numbers ONLY') //reply with this message and push username errors
        errors.push('Please use Letters and Numbers ONLY') //push error to array
    }

    //Password Information Validation 
    //Determine if password meets the 6 character requirement
    if ((request.body.password.length < 6)) { //if password does not meet the 6 characters requirement
        passerrors.push('Password is too Short, try again!') //reply with this message and push password error array
        errors.push('Password is too Short, try again!') //push error to array
    }
    //Determine if password entered matches the repeat password entered 
    if (request.body.password !== request.body.confirmpsw) { //confirm password entered
        confirmerrors.push('Password does NOT match! Please re-enter correct password') //reply with this message and push confirm password array
        errors.push('Password does NOT match! Please re-enter correct password') //push error to array
    }
    //Determine email validation 
    var reg_email = request.body.email.toLowerCase(); //Force a case sensitive email 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(reg_email)) {
    }
    else { //Send an Error if email does not meet requirement
        emailerrors.push('Email is invalid') //reply with this message
        errors.push('Email is invalid') //push to errors array
    }
    if (nameerrors.length == 0) { //check if no name errors
        console.log('No ame errors!'); //check if the statement functions
    }
    if (nameerrors.length > 0) { //check if there are name errors
        console.log('error:' + nameerrors) //see in the console log for name errors
        request.query.nameerrors = nameerrors.join(';'); //put the name errors together
    }

    if (usererrors.length == 0) { //check if no username errors
        console.log('No user errors!'); //check if the statement functions
    }
    if (usererrors.length > 0) { //check if there are username errors
        console.log('error:' + usererrors) //see in the console log for username errors
        request.query.usererrors = usererrors.join(';'); //put the username errors together
    }

    if (passerrors.length == 0) { //check if there are password errors
        console.log('No password errors!'); //check if the statement functions
    }
    if (passerrors.length > 0) { //check if there are password errors
        console.log('error:' + passerrors) //see in the console log for password errors
        request.query.passerrors = passerrors.join(';'); //put the password errors together
    }

    if (confirmerrors.length == 0) { //check if there are no errors with password confirmation
        console.log('No confirmation errors!'); //check if the statement functions
    }
    if (confirmerrors.length > 0) { //check if there are password confirmation errors
        console.log('error:' + confirmerrors); //see in the console log for password errors
        request.query.confirmerrors = confirmerrors.join(';'); //put the password confirmation errors together
    }
    if (emailerrors.length == 0) { //check if there are no errors
        console.log('No email errors!'); //see in the console to confirm that there are no email errors
    }
    if (emailerrors.length > 0) { //reply with an error if there is more than one error
        console.log('error:' + emailerrors); //see in the console for log email errors
        request.query.emailerrors = emailerrors.join(';'); //put the email errors together
    }

    //Save everything when data has no errors and take user to invoice 
    if (errors.length == 0) { //check if there are no errors
        console.log('none!'); //check if the statement functions
        request.query.username = reg_user; //insert username in the querystring
        request.query.name = request.body.name; //insert name into querystring
        
    //Record in JSON file
        fs.writeFileSync(filename, JSON.stringify(users_reg_data));
        console.log(theQtyQuerystring, "Redirect to invoice");
        res.redirect('./invoice.html' + theQtyQuerystring + `&username=${the_username}`);
        return; //redirect to the invoice
    }
    //Assert errors into querystring
    else { //if there is more than one errors
        console.log(errors) //check if the statement functions
        request.query.name = request.body.name; //add the name into querystring
        request.query.username = request.body.username; //add the username into querystring
        request.query.password = request.body.password; //add the password into querystring
        request.query.confirmpsw = request.body.confirmpsw; //add the confirm password into querystring
        request.query.email = request.body.email; //add the email back into querystring

        request.query.errors = errors.join(';'); //place all errors into querystring
        console.log(errors);
        res.redirect('./public/reg.html' + theQtyQuerystring) //add query from reg page and invoice when the register page reloads
    }
}
);

//Route for all HTTP request 
// Reference: https://www.geeksforgeeks.org/express-js-app-all-function/
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

//Professor Port helped me understand where to format the code so my server will listen on port 8080
app.use(express.static('./public')); //looks for files in the public directory (make a get request, look into public and see if it has the file)
app.listen(8080, () => console.log(`listening on port 8080`)); // start server on local host