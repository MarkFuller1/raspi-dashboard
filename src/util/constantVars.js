
let backend_url = "";
if (window.location.hostname === "localhost") {
  backend_url = "http://23.241.58.48:8081/";
} else {
  //we aren't running locally
  backend_url = "";
}

exports.backend_url = backend_url;
