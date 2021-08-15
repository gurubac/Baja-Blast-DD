require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let PORT = process.env.PORT || 3000;
const signale = require("signale");
const Location = require("../models/Location");
const cors = require('cors')
const nodemailer = require("nodemailer");
const moment = require("moment");

//connect to mongodb
const mongoURL = process.env.MONGO_URL;

//get dummy email auth credentials
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

//get real email address
const REAL_EMAIL = process.env.REAL_EMAIL;

//set timestamp for subject of email
let TIMESTAMP = moment(new Date()).format("h:mm:ss A - MMMM Do, YYYY");

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

app.get("/contact", cors(), async (req, res) => {
  res.render("contact")
});

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

	var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
	var mail = {
		from: EMAIL, // sender address
		to: REAL_EMAIL, // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: TIMESTAMP, // Subject line
		text: textBody,
		html: htmlBody
	};

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
  })
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