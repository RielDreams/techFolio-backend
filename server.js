///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env;
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
