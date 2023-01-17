const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
	{
		bio: String,
		skills: String,
		gitScreenShots: String,
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
