const AWS = require('aws-sdk');
const ses = new AWS.SES(); // SES for email delivery

exports.handler = (event, context, callback) => {
    
    const fromAddress = process.env['FROM_ADDRESS_' + event.formKey]; // Sets from address, based on the formKey input
    const toAddress = process.env['TO_ADDRESS_' + event.formKey]; // Sets from address, based on the formKey input

    let emailData = []; // Declares emailData variable which will have all the form data added to it.
    for (const key of Object.keys(event)) {
        emailData.push(key + ': ' + event[key]); // Adds each key and value from the event to the emailData array
    }

    emailData = emailData.join("\r\n"); // Converts the array into a string
    
    const subject = emailData.replace(/\s+/g, ' ').split(' ').slice(0, 8).join(' '); // Sets the subject to be the first eight words of the email data

    ses.sendEmail({ // Sends email
        Destination: {ToAddresses: [toAddress]},
        Message: {
            Body: {Text: {Data: emailData, Charset: 'UTF-8'}},
            Subject: {Data: subject, Charset: 'UTF-8'}
        },
        Source: fromAddress
        }, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err); // Sends error information if SES has a problem
            return;
        }
        console.log(data);
        callback(null, {'successMsg': process.env.SUCCESS_MESSAGE}); // Sends success message
    });
};