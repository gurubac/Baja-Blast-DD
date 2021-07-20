require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const signale = require('signale');
const Location = require('../models/Location');
//const User = require('../User');

mongoURL = process.env.MONGO_URL;

//connect to mongodb
mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        signale.success("Database Connected!");
      })
      .catch((err) => {
        signale.error(err);
      });

app.set('view engine','ejs')

app.get('/', (req, res) => {
  Location.find({}, function(err, locations) {
    //console.log(location);
    res.render('index', {
      locationList : locations
    })
  })
})

app.listen(PORT, () => {
  console.log(`Deployed at http://localhost:${PORT}`)
})


