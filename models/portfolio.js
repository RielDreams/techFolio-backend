const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
	{
		title: String,
		summary: String,
		skills: String,
		screenShots: String,
		github: String,
		linkedin: String,
		facebook: String,
		url: [String],
		uid: String,
	},
	{
		timestamps: true,
	}
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
