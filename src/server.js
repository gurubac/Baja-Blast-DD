require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const signale = require("signale");
const Location = require("../models/Location");
const cors = require('cors');
const { SocketAddress } = require("net");

//create a new location
//const User = require('../User');

//socket 
const server = require("http").createServer(app);
const io = require("socket.io")(server, {cors : {origin : '*'}});

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

app.use(cors())
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


app.post("/2779%20Aborn%20Rd/info", async (req, res) => {
  let data = req.body;
  
  //finding location in database and pushing a comment array with status and timestamp
  let findLocation = await Location.findOneAndUpdate(
    { address: "2779 Aborn Rd" },
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

app.post("/811%20Kifer%20Rd/info", async (req, res) => {
  let data = req.body;
  
  //finding location in database and pushing a comment array with status and timestamp
  let findLocation = await Location.findOneAndUpdate(
    { address: "811 Kifer Rd" },
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

app.get("/2779%20Aborn%20Rd", async (req, res) => {
  let address = "2779 Aborn Rd";
  let data = await findUser(address);

  //once we get properly updated/deleted data render the data along with the page
  res.render("results", {
    location: data,
  });

  
  
});

app.get("/811%20Kifer%20Rd", async (req, res) => {
  let address = "811 Kifer Rd";
  let data = await findUser(address);

  //once we get properly updated/deleted data render the data along with the page
  res.render("results", {
    location: data,
  });
});
   
server.listen(PORT, () => {
  signale.success(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`User connected - ${socket.id}`);

  socket.on("results", (data) => {  
    console.log(data);
    socket.emit("results", data);
  });
});