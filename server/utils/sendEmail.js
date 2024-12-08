import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

// Loading the environment variables
dotenv.config({path: '/Users/charlieatkinson/Documents/School/A Level/Y13/ComputerScience/NEA/Code/ERP/.env'});

// Defining the Twilio API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendEmail(to, subject, text) {
    // Defining the different values being used within the email
    const msg = {
        to: to, // The recipients email address
        from: 'juzatkia@gmail.com', // YOUR_SPAM_EMAIL - The email must be validated before use
        subject: subject, // What the email regards, such as 2FA
        text: text, // What the contents of the email is
    };

    sgMail
        // Send the email to the user
        .send(msg)
        // As sending the message is asynchronous,
        // once the message has been sent, output the set message into the console
        .then(() => {
            console.log("Email sent successfully");
        })
        // If an error occurs, output the error message
        .catch((err) => {
            console.log('Error sending email:', err);
        });
}

// Example usage: The example would be sent to the users junk mailbox due to the design

//              to            subject            text
// sendEmail('juzatkia@gmail.com', '2FA_CODE', '1234')