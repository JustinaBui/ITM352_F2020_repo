const fs = require('fs');

const user_data_filename = 'user_data.json';

var data = fs.readFileSync(user_data_filename, 'utf-8');

user_reg_data = JSON.parse(data);

//console.log(user_data_filename, typeof user_reg_data, typeof data);

//console.log(user_reg_data);

//if user exists, get their pass
if(typeof user_reg_data ['itm352'] != 'undefined') {
    console.log(user_reg_data ['itm352']['password']=='grader');
}