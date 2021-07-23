require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const signale = require("signale");
const Location = require("../models/Location");
//const User = require('../User');

mongoURL = process.env.MONGO_URL;
//connect to mongodb
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

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Location.find({}, function (err, locations) {
    //console.log(location);
    res.render("index", {
      locationList: locations,
    });
  });
});

async function findUser(address) {
  return Location.findOne({ address: address });
}

app.get("/2779%20Aborn%20Rd", async (req, res) => {
  let address = "2779 Aborn Rd";
  
  //finding location in database and pushing a comment array with status and timestamp
  let findLocation = await Location.findOneAndUpdate(
    { address: "2779 Aborn Rd" },
    {
      $push: {
        comment: [
          {status: "new comment"}
        ]
      }
    }
  )
  
  let data = await findUser(address);
  //console.log(data);

  //once we get data render the data along with the page
  res.render("results", {
    location: data,
  });
  
});

app.get("/811%20Kifer%20Rd", async (req, res) => {
  let data = await findUser("811 Kifer Rd");
  //console.log(data);
  res.render("results", {
    location: data,
  });
});
   

app.listen(PORT, () => {
  console.log(`Deployed at http://localhost:${PORT}`);
});
