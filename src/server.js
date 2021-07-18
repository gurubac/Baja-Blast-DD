require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const signale = require('signale');
const locations = require('../models/Location');

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
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`Deployed at http://localhost:${PORT}`)
})

//BEFORE (HARDCODED)
// app.get('/api/users', (req, res) => {
//     const data = {
//       address: "2779 Aborn Rd",
//       city: "San Jose",
//       state: "CA",
//       zip: "95121"
//     };
//     //res.json(data);
//     res.send(data);
// })

//AFTER (GETS FROM MONGO DB)
app.get('/api/locations', (req, res) => {
  locations.find({}, function(err, location) {
    //console.log(location);
    res.json(location);
    res.send(location);
  })
})
