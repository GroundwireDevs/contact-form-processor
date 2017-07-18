const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = (event, context, callback) => {
    
    let emailData = [];
    for (const key of Object.keys(event)) {
        emailData.push(key + ': ' + event[key]); // Adds each key and value from the event to the emailData array
    }

    emailData = emailData.join("\r\n"); // Converts the array into a string
    
    const subject = emailData.replace(/\s+/g, ' ').split(' ').slice(0, 8).join(' ');

    ses.sendEmail({
        Destination: {ToAddresses: [process.env.TO_ADDRESS]},
        Message: {
            Body: {Text: {Data: emailData, Charset: 'UTF-8'}},
            Subject: {Data: subject, Charset: 'UTF-8'}
        },
        Source: process.env.FROM_ADDRESS
        }, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail(err);
            return;
        }

        console.log(data);
        callback(null, {'successMsg': process.env.SUCCESS_MESSAGE});
    });
    
};