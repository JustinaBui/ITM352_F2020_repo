const fs = require('fs');

const user_data_filename = 'user_data.json';
var data;
    // var data = fs.readFileSync(user_data_filename, 'utf-8');
    fs.readFile(user_data_filename, (err, thedata) => {
        if (err) throw err;
        data = thedata;
        console.log(data);
    });

// user_reg_data = JSON.parse(data);

// console.log(user_data_filename, typeof user_reg_data, typeof data);

// console.log(user_reg_data);