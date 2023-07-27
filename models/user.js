const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	unique_id: Number,
	firstName: String,
	lastName: String,
	mobileNumber: String,
	email: String,
	password: String,
	passwordConf: String,
	profilePicture: String // This field will store the profile picture as a base64-encoded string
});

const User = mongoose.model('User', userSchema);

module.exports = User;