const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const ses = new AWS.SES();
const config = require('./config.json');

module.exports.handler = (event, context, callback) => {
	let emailData = []; // Declares emailData variable which will have all the form data added to it.
	for (const key of Object.keys(event)) {
		emailData.push(key + ': ' + event[key]); // Adds each key and value from the event to the emailData array
	}
	emailData = emailData.join('\r\n'); // Converts the array into a string

	let subject = emailData.replace(/\s+/g, ' ').split(' ').slice(0, 8).join(' '); // Sets the subject to be the first eight words of the email data
	subject = config[event.form].title + ' | ' + subject; // Start subject with the title of the form.
	ses.sendEmail({ // Sends email
		Destination: {ToAddresses: [config[event.form].toAddress]},
		Message: {
			Body: {Text: {Data: emailData, Charset: 'UTF-8'}},
			Subject: {Data: subject, Charset: 'UTF-8'}
		},
		Source: config[event.form].fromAddress
	}, function (err, data) {
		if (err) {
			console.log(err, err.stack);
			callback(null, {'success': false, 'message': config[event.form].failureMessage}); // Sends error message if SES has a problem
		}
		callback(null, {'success': true, 'message': config[event.form].successMessage}); // Sends success message if the message succceded.
	});
};
