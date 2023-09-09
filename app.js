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

    // const url = await ngrok.connect(4000);
    // console.log("server url: ", url)
 
    app.post('/incoming', (req, res) => {
        const message = req.body;
        console.log("msg ", message)

        const twiml = new MessagingResponse();
        twiml.message(`I am busy now: `); //response message.
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})();






