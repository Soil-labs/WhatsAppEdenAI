const dotenv = require('dotenv');
const twilio = require('twilio');
const cors = require("cors");
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const {
    identifyCategoryAndReply, //understand this function
  } = require("./backEnd_api_func.js");
  

const {
    checkIfFirstMessageWhatsAPPConnection,
    findIfMessageIsAResponse,
    
} = require("./whatsapp_func.js");

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

    app.post('/incoming', async (req, res) => {
        const message = req.body;
        const twiml = new MessagingResponse();
        let whatsAppNumber = null;
        if (message && message.From) {
            whatsAppNumber = message.From.split(":")[1]
        }
        console.log("message ", message)
        // --------------- check if first message WHATSAPP connection ----------------
        if (message.Body == "/start") {
            twiml.message('Welcome to Eden Personal Coach \nWrite the 3 digit number to connect with your Eden account');
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        }
        //the user likely send the code to connect
        const msg = {
            text: message.Body,
            whatsAppNumber: whatsAppNumber
        }
        // let response = await checkIfFirstMessageWhatsAPPConnection(msg);
        // console.log("res = ", response)
        // if (response.done == true) {
        //     let messageSentWhatsAPP = ""
        //     if (response.messageBack) {
        //         messageSentWhatsAPP = response.messageBack
        //     }
        //     twiml.message(messageSentWhatsAPP);
        //     res.writeHead(200, { 'Content-Type': 'text/xml' });
        //     res.end(twiml.toString());
        // }


        // findIfMessageIsAResponse(msg);

    });

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})();






