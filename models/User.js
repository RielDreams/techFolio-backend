const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		occupation: String,
		bio: String,
		skills: [String],
		email: String,
		password: String,
		portfolio: [{type: Schema.Types.ObjectId, ref: 'portfolio'}],
		linkedin: String,
		github: String,
		uid: String,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
