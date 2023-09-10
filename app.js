const dotenv = require('dotenv');
const twilio = require('twilio');
const cors = require("cors");
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

dotenv.config();

const accountSid = process.env.TwILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);



(async () => {

    const app = express();
    const port = 3000;


    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.post('/incoming', (req, res) => {
        const message = req.body;
        const twiml = new MessagingResponse();
        if (message.Body == "/start") {
            twiml.message('Welcome to Eden Personal Coach \nWrite the 3 digit number to connect with your Eden account');
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        }

    });

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})();






