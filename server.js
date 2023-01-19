///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const {
	PORT = 4000,
	MONGODB_URL,
	PRIVATE_KEY_ID,
	PRIVATE_KEY,
	CLIENT_ID,
} = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");
// import portfolio
const Portfolio = require("./models/portfolio");
const User = require("./models/User");
const { urlencoded } = require("express");

//Admin
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
admin.initializeApp({
	credential: admin.credential.cert({
			"type": "service_account",
			"project_id": "techfolio-e1563",
			"private_key_id": PRIVATE_KEY_ID,
			"private_key":PRIVATE_KEY.replace('/n', ''),
			"client_email": "firebase-adminsdk-b44id@techfolio-e1563.iam.gserviceaccount.com",
			"client_id": CLIENT_ID,
			"auth_uri": "https://accounts.google.com/o/oauth2/auth",
			"token_uri": "https://oauth2.googleapis.com/token",
			"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
			"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b44id%40techfolio-e1563.iam.gserviceaccount.com"
	}
	)		  
});

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
// Connection Events
mongoose.connection
	.on("open", () => console.log("You are connected to mongoose"))
	.on("close", () => console.log("You are disconnected from mongoose"))
	.on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(urlencoded({ extended: true }));

//firebase Authentication
app.use(async function (req, res, next) {
	try {
		const token = req.get("Authorization");
		if (token) {
			const user = await getAuth().verifyIdToken(token.replace("Bearer ", ""));
			req.user = user;
		} else {
			req.user = null;
		}
	} catch (error) {
		// perform additional task to follow up
		req.user = null;
	}
	next(); // this function invokes next middleware function
});
function isAuthenticated(req, res, next) {
	if (req.user) return next();
	res.status(401).json({ message: "you must login first" });
}

///////////////////////////////
// ROUTES
////////////////////////////////

////////////////////
// create a test route
app.get("/", (req, res) => {
	res.send("hello world");
});

////////////////////
//INDEX
app.get("/portfolio", async (req, res) => {
	try {
		res.json(await Portfolio.find({}));
	} catch (error) {
		res.status(400).json(error);
	}
});

app.get("/user", async (req, res) => {
	try {
		res.json(await User.find({}));
	} catch (error) {
		res.status(400).json(error);
	}
});

////////////////////
//DESTORY
app.delete("/portfolio/:id", async (req, res) => {
	try {
		res.json(await Portfolio.findByIdAndRemove(req.params.id));
	} catch (error) {
		res.status(400).json(error);
	}
});

app.delete("/user/:id", async (req, res) => {
	try {
		res.json(await User.findByIdAndRemove(req.params.id));
	} catch (error) {
		res.status(400).json(error);
	}
});

////////////////////
//UPDATE
app.put("/portfolio/:id", async (req, res) => {
	try {
		res.json(
			await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true })
		);
	} catch (error) {
		res.status(400).json(error);
	}
});

app.put("/user/:id", async (req, res) => {
	try {
		res.json(
			await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		);
	} catch (error) {
		res.status(400).json(error);
	}
});

////////////////////
//CREATE
app.post("/portfolio", async (req, res) => {
	try {
		res.json(await Portfolio.create(req.body));
	} catch (error) {
		res.status(400).json(error);
	}
});

app.post("/user", async (req, res) => {
	try {
		res.json(await User.create(req.body));
	} catch (error) {
		res.status(400).json(error);
	}
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
