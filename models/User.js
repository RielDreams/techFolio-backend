const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		portfolio: {type: Schema.Types.ObjectId, ref: 'portfolio'}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
