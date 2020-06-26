const express = require("express");
const cors = require("cors");

const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));

app.listen( process.env.PORT || 3333, (res, req) => {
  console.log("Server running on port 3333");
});
