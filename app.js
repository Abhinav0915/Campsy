const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

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

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
  

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/home', (req,res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Server is now running on port 3000');
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/addcampground', async (req,res) => {
    const camp = new Campground({
        title: 'My School Playground',
        price: 'Rs 10',
        description: 'Cringe Camping'
    });
    await camp.save();
    res.send(camp)
})