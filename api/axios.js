const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const baseURL = process.env.NEXT_PUBLIC_GRAPHQL_URI;

console.log("baseURL = ", baseURL);
const apiClient = axios.create({
  baseURL,
  method: "POST",
});

apiClient.interceptors.request.use(function (config) {
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
}, null);

module.exports = apiClient;
