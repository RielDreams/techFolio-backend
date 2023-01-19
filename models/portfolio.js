const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
	{
		name: String,
		summary: String,
		skills: String,
		screenShots: String,
		github: String,
		linkedin: String,
		facebook: String,
		url: [String],
	},
	{
		timestamps: true,
	}
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
