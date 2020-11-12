/* Reference to Lab 13 Exercise 4 Part C. Using a ./public to create a product_data.js file */

products = [
    {
        "name": "Banh Mi",
        "price": 8.00,
        "image": "./images/Banhmi.jpg"
    },
    {
        "name": "Beef Stew",
        "price": 17.00,
        "image": "./images/Beefstew.jpg"
    },
    {
        "name": "Crab Noodle Soup",
        "price": 15.00,
        "image": "./images/Crabsoup.jpg"
    },
    {
        "name": "Pho",
        "price": 13.00,
        "image": "./images/Pho.jpg"
    },
    {
        "name": "Spring Rolls",
        "price": 16.00,
        "image": "./images/Springrolls.jpg"
    },
    {
        "name": "Summer Rolls",
        "price": 8.00,
        "image": "./images/Sumrolls.jpg"
    }
];

if (typeof module != 'undefined') {
    module.exports.products = products;
}