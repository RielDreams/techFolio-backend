const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
	{
		projectName: String,
		summary: String,
		technology: [String],
		screenShots: String,
		projectGithub: String,
		url: [String],
		uid: String,
	},
	{
		timestamps: true,
	}
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
