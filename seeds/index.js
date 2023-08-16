const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
async function main() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/campsy', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database is now Connected!');
    } catch (error) {
      console.error('Connection Error:', error);
    }
  }

const sample = array => array[Math.floor(Math.random()* array.length)]


mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})