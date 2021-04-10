require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);

// Sets the "body" object with requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initiate socketio and makes it available in the routes
const io = require("./socketio/index.js")(http);
app.set("socketio", io);

// Adds all routes from routes/index.js with an addition of route prefix
const routes = require("./routes/index.js");
app.use(process.env.PREFIX || "/api", routes);

// Server listens on port
http.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:" + (process.env.PORT || 5000));
});
