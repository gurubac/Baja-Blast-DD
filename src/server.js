require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let PORT = process.env.PORT || 3000;
const signale = require("signale");
const Location = require("../models/Location");
const cors = require('cors')

//connect to mongodb
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {
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
  
app.use(cors())
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function findUser(address) {
  return Location.findOne({ address: address });
}

app.get("/", cors(), (req, res) => {
  Location.find({}, function (err, locations) {
    //console.log(location);
    res.render("index", {
      locationList: locations,
    });
  });
});

app.get("/:address", cors(), async (req, res) => {
  let address = req.params.address;
  let data = await findUser(address);

  res.render("results", {
    location: data,
  });
});
   
app.post("/:address/info", cors(), async (req, res) => {
  let data = req.body;
  let address = req.params.address;
  
  await Location.findOneAndUpdate(
    { address: address },
    {
      $push: {
        comment: [
          {status: data.status,
          timestamp: data.timestamp}
        ]
      }
    }
  )

  res.status(200).send({ status: 'OK'});
});


app.listen(PORT, () => {
  signale.success(`Server running on http://localhost:${PORT}`);
});
//mahir
//mahir2