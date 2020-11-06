//An array of my food products, images from my personal Yelp page//

var products =
    [
        {
            "name": "Brown Sugar Boba",
            "price": 4.50,
            "image": "./images/SummerTea.jpg",
            "type": "Drink"
        },
        {
            "name": "Dalgona Milk Tea",
            "price": 5.90,
            "image": "./images/DalgonaCoffee.jpg",
            "type": "Drink"
        },
        {
            "name": "English Earl Grey Milk Tea",
            "price": 4.99,
            "image": "./images/RabbitRabbit.jpg",
            "type": "Drink"
        },
        {
            "name": "Chocolate Cream Souffle Pancakes",
            "price": 11.49,
            "image": "./images/SoufflePc.jpg",
            "type": "Brunch"
        },
        {
            "name": "Milk N' Cereal Pancakes",
            "price": 14.00,
            "image": "./images/MilknCerealPc.jpg",
            "type": "Brunch"
        },
        {
            "name": "Mana Bowl",
            "price": 8.00,
            "image": "./images/HaleiwaBowls.jpg",
            "type": "Dessert"
        },
        {
            "name": "Strawberry Shortcake",
            "price": 7.00,
            "image": "./images/StrawberryShortcase.jpg",
            "type": "Dessert"
        }
    ];

if (typeof module != 'undefined') {
    module.exports.products = products;
}