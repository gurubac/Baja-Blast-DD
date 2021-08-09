require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const signale = require("signale");
const Location = require("../models/Location");
const cors = require('cors')

//socket 
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors : {origin : '*'}});

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

// app.use(cors())
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function findUser(address) {
  return Location.findOne({ address: address });
}

app.get("/", (req, res) => {
  Location.find({}, function (err, locations) {
    //console.log(location);
    res.render("index", {
      locationList: locations,
    });
  });
});

app.get("/:address", async (req, res) => {
  let address = req.params.address;
  let data = await findUser(address);

  res.render("results", {
    location: data,
  });
});
   
app.post("/:address/info", async (req, res) => {
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
});


server.listen(PORT, () => {
  signale.success(`Server running on port ${PORT}`);
});