const {
    checkUsersForWhatsAPPConnection,
    findMember,
    findPosition,
    findQueryResponses,
    updateQueryResponse
} = require("./backEnd_api_func.js");


async function checkIfFirstMessageWhatsAPPConnection(msgWhatsAPP) {

    //msgWhatsAPP{text, whatsAppNumber}

    const message = msgWhatsAPP.text;
    const whatsAppNumber = msgWhatsAPP.whatsAppNumber

    // if message is only 3 letters
    // if all letters of message are numbers
    if (message.length == 3 && message.match(/^[0-9]+$/) != null) {


        let resCheck = await checkUsersForWhatsAPPConnection({
            authNumberWhatsAppMessage: message,
            whatsappNumber: whatsAppNumber
        })

        console.log("resCheck = ", resCheck)

        let messageBack = "This is not the right code try again please"
        if (resCheck._id) {
            messageBack = `hello ${resCheck.name}!!! you are connected I can't wait to find the perfect opportunity for you`
        }

        return {
            done: true,
            messageBack: messageBack,
        }

    } else {
        return {
            done: false,
            messageBack: "",
        }
    }
}

async function findIfMessageIsAResponse(msg) {

    const {
        text,
        whatsAppNumber
    } = msg

    let memberData = await findMember({
        whatsAppNumber: whatsAppNumber
    });

    let findQueryResponsesRes

    if (!memberData) {
        let positionData = await findPosition({
            whatsAppNumber: whatsAppNumber
        });

        findQueryResponsesRes = await findQueryResponses({
            sentFlag: true,
            phase: "QUERY",
            responderType: "POSITION",
            responderID: positionData._id,
        });

    } else {

        console.log("change = -d-d-d-d-d-d" )

        findQueryResponsesRes = await findQueryResponses({
            sentFlag: true,
            phase: "QUERY",
            responderType: "USER",
            responderID: memberData._id,
        });
    }



    if (findQueryResponsesRes.length > 0) {
        let queryResponse = findQueryResponsesRes[0];
        console.log("queryResponse = " , queryResponse)

   
        // --------------- update backend that message was sent ----------------
        let res = await updateQueryResponse({
            _id: queryResponse._id,
            sentFlag: false,
            answer: msg,
            phase: "RESPONDED",
        })
        console.log("res = " , res)
        // --------------- update backend that message was sent ----------------
    }

 
  }
  


module.exports = {
    checkIfFirstMessageWhatsAPPConnection,
    findIfMessageIsAResponse
}