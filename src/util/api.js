import axios from "axios";
var constants = require("./constantVars");

const request_headers = {
  "Access-Control-Allow-Origin": "*",
  "content-type": "application/json",
  Accept: "application/json",
};

export async function getAllIps() {
  return axios({
    method: "GET",
    url: "http://23.241.58.48:8081/nodes/ip",
    headers: request_headers,
  });
}

export async function refreshActiveNodes() {
  return axios({
    method: "GET",
    url: "http://23.241.58.48:8081/nodes/active",
    headers: request_headers,
  });
}

export async function setTimer(ip) {
  return axios({
    method: "POST",
    url: "http://" + ip + ":8080/timer/0:0:20:0",
    headers: request_headers,
  });
}

export async function startTimer(ip) {
  return axios({
    method: "POST",
    url: "http://" + ip + ":8080/timer/start",
    headers: request_headers,
  });
}

export async function getNodeLogs(ip) {
  return axios({
    method: "GET",
    url: "http://23.241.58.48:8081/nodes/" + ip + "/logs",
    headers: request_headers,
  });
}
