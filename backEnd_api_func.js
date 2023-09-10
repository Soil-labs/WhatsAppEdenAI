const apiClient = require("./api/axios.js");




async function checkUsersForWhatsAPPConnection(filter) {
    let res = await apiClient({
        data: {
            query: `mutation {
                checkUsersForWhatsAPPConnection(fields: {
                authNumberWhatsAppMessage: "${filter.authNumberWhatsAppMessage}",
                whatsappNumber: "${filter.whatsappNumber}"
                  }) {
                    _id
                    name
                    done
                    whatsappNumber
                    authWhatsappCode
                }
              }`,
        },
    }).catch((err) => {
        if (err?.response?.data?.errors) {
            console.log(err.response.data.errors);
        }
    });

    if (res?.data?.data?.checkUsersForWhatsAPPConnection) {
        return res.data.data.checkUsersForWhatsAPPConnection;
    } else {
        return [];
    }
}

async function findMember(filter) {
    const textUpdate = filterToText(filter)
    let res = await apiClient({
      data: {
        query: `query {
                  findMember(fields: {
                    ${textUpdate}
                  }) {
                    _id
                    discordName
                    conduct {
                        whatsappNumber
                        whatsappConnectionCode
                    }
                }
              }`,
      },
    }).catch((err) => {
      if (err?.response?.data?.errors) {
        console.log(err.response.data.errors);
      }
    });
  
    if (res?.data?.data?.findMember) {
      return res.data.data.findMember;
    } else {
      return [];
    }
  }

async function findQueryResponses(filter) {

    const textUpdate = filterToText(filter)
  
    let res = await apiClient({
      data: {
        query: `query {
                  findQueryResponses(fields: {
                    ${textUpdate}
                  }) {
                  ${queryResponseFields}
                }
              }`,
      },
    }).catch((err) => {
      if (err?.response?.data?.errors) {
        console.log(err.response.data.errors);
      }
    });
  
    if (res?.data?.data?.findQueryResponses) {
      return res.data.data.findQueryResponses;
    } else {
      return [];
    }
  }

  async function findPosition(filter) {
    // filter = { _id, discordName,telegramChatID}
  
    const textUpdate = filterToText(filter)
  
    let res = await apiClient({
      data: {
        query: `query {
                  findPosition(fields: {
                    ${textUpdate}
                  }) {
                    _id
                    name
                    conduct {
                      whatsappNumber
                      whatsappConnectionCode
                    }
                }
              }`,
      },
    }).catch((err) => {
      if (err?.response?.data?.errors) {
        console.log(err.response.data.errors);
      }
    });
  
    if (res?.data?.data?.findPosition) {
      return res.data.data.findPosition;
    } else {
      return [];
    }
  }
  
  async function updateQueryResponse(updateQuery) {


    const textUpdate = filterToText(updateQuery)
  
    console.log("textUpdate = " , textUpdate)
  
    let res = await apiClient({
      data: {
        query: `mutation {
                  updateQueryResponse(fields: {
                    ${textUpdate}
                  }) {
                  ${queryResponseFields}
                }
              }`,
      },
    }).catch((err) => {
      if (err?.response?.data?.errors) {
        console.log(err.response.data.errors);
      }
    });
  
    if (res?.data?.data?.updateQueryResponse) {
      return res.data.data.updateQueryResponse;
    } else {
      return [];
    }
  }

  async function identifyCategoryAndReply(filter) {

    const textUpdate = filterToText(filter)
  
    let res = await apiClient({
      data: {
        query: `query {
                  identifyCategoryAndReply(fields: {
                    ${textUpdate}
                  }) {
                    category
                    reply
                }
              }`,
      },
    }).catch((err) => {
      if (err?.response?.data?.errors) {
        console.log(err.response.data.errors);
      }
    });
  
    if (res?.data?.data?.identifyCategoryAndReply) {
      return res.data.data.identifyCategoryAndReply;
    } else {
      return [];
    }
  }


function filterToText(filter) {
    let filterText = "";
    
    if (filter._id) {
      filterText += `_id: "${filter._id}"\n`;
    }
  
    if (filter.sentFlag != null) {
      filterText += `sentFlag: ${filter.sentFlag}\n`;
    }
  
    if (filter.phase) {
      filterText += `phase: ${filter.phase}\n`;
    }
  
    if (filter.question) {
      filterText += `question: "${filter.question}"\n`;
    }
  
    if (filter.answer) {
      filterText += `answer: "${filter.answer}"\n`;
    }
  
    if (filter.senderID) {
      filterText += `senderID: "${filter.senderID}"\n`;
    }
  
    if (filter.responderID) {
      filterText += `responderID: "${filter.responderID}"\n`;
    }
  
    if (filter.senderType) {
      filterText += `senderType: ${filter.senderType}\n`;
    }
  
    if (filter.responderType) {
      filterText += `responderType: ${filter.responderType}\n`;
    }
  
    if (filter.whatsappNumber) {
      filterText += `whatsAppNumber: "${filter.whatsAppNumber}"\n`;
    }
  
    if (filter.message) {
      filterText += `message: "${filter.message}"\n`;
    }
  
    if (filter.replyFlag) {
      filterText += `replyFlag: ${filter.replyFlag}\n`;
    }
  
    return filterText;
  }

module.exports = {
    checkUsersForWhatsAPPConnection,
    findMember,
    findPosition,
    findQueryResponses,
    updateQueryResponse,
    identifyCategoryAndReply
}