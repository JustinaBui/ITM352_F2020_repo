//An array of my food products, images from my personal Yelp page//

var products = [
    {
        "name": "Brown Sugar Boba with Grass Jelly",
        "price": 4.50,
        "image": "./images/SummerTea.jpg",
        "type": "Drink"
    },
    {
        "name": "Dalgona Milk Tea with Dalgona Crunch and Boba",
        "price": 5.90,
        "image": "./images/DalgonaCoffee.jpg",
        "type": "Drink"
    },
    {
        "name": "English Earl Grey Milk Tea with Egg Pudding",
        "price": 4.99,
        "image": "./images/RabbitRabbit.jpg",
        "type": "Drink"
    },
    {
        "name": "Injeolmi Bingsu (Kinako and Soybean Powder)",
        "price": 7.95,
        "image": "./images/Bingsu.jpg",
        "type": "Dessert"
    },
    {
        "name": "Mana Acai Bowl",
        "price": 8.00,
        "image": "./images/HaleiwaBowls.jpg",
        "type": "Dessert"
    },
    {
        "name": "Strawberry Shortcake Roll-Up Ice Cream",
        "price": 7.00,
        "image": "./images/StrawberryShortcase.jpg",
        "type": "Dessert"
    },
    {
        "name": "Milk N' Cereal Pancakes",
        "price": 14.00,
        "image": "./images/MilknCerealPc.jpg",
        "type": "Brunch"
    },
    {
        "name": "Chocolate Cream Souffle Pancakes",
        "price": 11.49,
        "image": "./images/SoufflePc.jpg",
        "type": "Brunch"
    }
];

if (typeof module != 'undefined') {
    module.exports.products = products;
}