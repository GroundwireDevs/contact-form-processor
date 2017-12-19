# contact-form-processor

This contact form backend is designed for static websites which can't use traditional server email messaging. It takes JSON as input and emails it in a readable format. It can be used for multiple websites or webpages. Quality of this project may not be great as we are not currently using it in production.

## Deployment

1. Clone the repository locally.

2. Create a config.json file according to the [schema](https://github.com/GroundwireDevs/contact-form-processor/blob/master/config.schema.json) and place it in the root of the repository. The SES account must be out of the sandbox and fromAddress must be a verified identity (domain or specific email).

3. Make sure that the file permissions are correct, for example, chmod -R 777 *

4. Zip the package's contents, for example, zip -r commitment-form-processor.zip ..

5. Upload the deployment package to S3 and change the [CloudFormation template](https://github.com/GroundwireDevs/contact-form-processor/blob/master/contact-form-processor.yml) CodeUri value to the package's S3 URI.

6. Create a new CloudFormation stack with the [CloudFormation template](https://github.com/GroundwireDevs/contact-form-processor/blob/master/contact-form-processor.yml).

7. Send an event to the Lambda function, for example, through API Gateway. It must validate against [event.schema.json](https://github.com/GroundwireDevs/contact-form-processor/blob/master/event.schema.json).
