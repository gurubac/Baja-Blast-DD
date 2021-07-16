require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const signale = require('signale');

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

//post data from mongodb to our endpoint
app.get('/api/users', (req, res) => {
    const data = {
      address: "2779 Aborn Rd",
      city: "San Jose",
      state: "CA",
      zip: "95121"
    };
    //res.json(data);
    res.send(data);
})
