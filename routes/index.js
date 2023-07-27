const express = require('express');
const router = express.Router();
const User = require('../models/user');
const fs = require('fs');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.post('/', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if (!personInfo.firstName || !personInfo.lastName || !personInfo.email || !personInfo.password || !personInfo.passwordConf || !personInfo.mobileNumber) {
		res.send();
	} else {
		if (personInfo.password !== personInfo.passwordConf) {
			res.send({ "Success": "Password is not matched" });
		} else if (!isValidMobileNumber(personInfo.mobileNumber)) {
			res.send({ "Success": "Mobile number should have exactly 10 digits" });
		} else {
			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							firstName: personInfo.firstName,
							lastName: personInfo.lastName,
							mobileNumber: personInfo.mobileNumber,
							email: personInfo.email,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							profilePicture: '' // Initialize the profilePicture field
						});

						if (req.files && req.files.profilePicture) {
							const profilePictureData = req.files.profilePicture.data;
							const profilePictureExtension = req.files.profilePicture.name.split('.').pop();
							const base64Image = profilePictureData.toString('base64');
							newPerson.profilePicture = `data:image/${profilePictureExtension};base64,${base64Image}`;
							fs.unlink(req.files.profilePicture.tempFilePath, (err) => {
								if (err) {
									console.error('Error deleting temporary profile picture:', err);
								}
							});
						}

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are registered, You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}
			});
		}
	}
});

function isValidMobileNumber(mobileNumber) {
	const mobileNumberRegex = /^\d{10}$/;
	return mobileNumberRegex.test(mobileNumber);
}


router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {

			if (data.password == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			return res.render('data.ejs', {
				"firstName": data.firstName,
				"lastName": data.lastName,
				"mobileNumber": data.mobileNumber,
				"email": data.email
			});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});


module.exports = router;