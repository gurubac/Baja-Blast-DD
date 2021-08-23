//dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let PORT = process.env.PORT || 3000;
const signale = require("signale");
const Location = require("../models/Location");
const cors = require('cors')
const nodemailer = require("nodemailer");

//mongo URL
const mongoURL = process.env.MONGO_URL;

//get dummy email auth credentials
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

//get real email address
const REAL_EMAIL = process.env.REAL_EMAIL;

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

//app.use()
app.use(cors())
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//contact form render
app.get("/contact", cors(), async (req, res) => {
  res.render("contact")
});

//contact page nodemailer stuff
app.post("/contact", cors(), function(request, response) {
  // create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: EMAIL, // this should be YOUR GMAIL account
			pass: PASSWORD // this should be your password
		}
	});

  var CLIENT_EMAIL = request.body.email;
	var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2>
                  <h4>Name: ${request.body.name}</h4> 
                  <h4>Email: <a href="mailto:${request.body.email}">${request.body.email}</a></h4>
                  <p>${request.body.message}</p>`;
	var mail = {
		from: EMAIL, // sender address
		to: REAL_EMAIL, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: `New message from: ${CLIENT_EMAIL}`, // Subject line
		text: textBody,
		html: htmlBody
	};
``
	// send mail with defined transport object
	transporter.sendMail(mail, function (err, info) {
		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
});

//index
app.get("/", cors(), (req, res) => {
  Location.find({}, function (err, locations) {
    //console.log(location);
    res.render("index", {
      locationList: locations,
    });
  });
});

//handle case of user going to /address
app.get("/address", cors(), async (req, res) => {
  res.send("u cant go here bro");
});

//error handling for invalid address included
app.get("/:address", cors(), async (req, res) => {
  let address = req.params.address;
  Location.findOne({address : address}, function(err, result) {
    if (!result) {
       res.send("this is not a valid address")
    } 
    
    else {
      let data = result;
      res.render("results", {
        location: data,
      })
    }
  });
});

//post endpoint for updating a location's status/timestamp
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