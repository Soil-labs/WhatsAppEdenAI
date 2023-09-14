const dotenv = require('dotenv');
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

const { TwILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require("twilio")(TwILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


(async () => {

    const app = express();
    const port = process.env.PORT || 4000;


    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
        res.status(200).json("Home Route Reached")
    });

    //this code is for sending whatsapp message to a user
    //sample variables to send
    //to: whatsapp:+2348063348577
    //from: whatsapp:+14155238886
    //body: the message to send
    app.post('/sending', async (req, res) => {
        const { from, to, body } = req.body;
        console.log("params ", from, to, body)
        try {
            const message = await client.messages.create({
                body,
                from,
                to
            });
            // this is how you sent a message to a user
            // const message_2 = await client.messages.create({
            //     body: "heey my friend awesomedfjosdfo skjdfoks jdfokjs d",
            //     from: "whatsapp:+14155238886",
            //     to: "whatsapp:+48666237829"
            // });
    
            console.log(message);
            res.status(200).json("OK")
        } catch (error) {
            res.status(500).json(error.message)
            console.log("error from sending message", error);
        }

    })

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






