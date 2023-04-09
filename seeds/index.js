const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 450; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '6424b65e074c9f17bf0d10fa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nesciunt est ad, ab et minus sit earum tempore! Veniam est atque voluptatum molestiae? Tempore quas eius facilis tempora unde ipsam.',
            price, 
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: [
                {
                url: 'https://res.cloudinary.com/dnowrxjqc/image/upload/v1680694041/YelpCamp/cx9dhso1kd28upksst36.jpg',
                filename: 'YelpCamp/cx9dhso1kd28upksst36'
                }, 
                {
                url: 'https://res.cloudinary.com/dnowrxjqc/image/upload/v1680694040/YelpCamp/lsorg7f2jydghctfiwyl.jpg',
                filename: 'YelpCamp/lsorg7f2jydghctfiwyl'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})