require("dotenv").config();

const app = require("express")();
const http = require("http").createServer(app);

// Adds all routes from routes/index.js with an addition of route prefix
const routes = require("./routes/index.js");
app.use(process.env.PREFIX || "/", routes);

const io = require("./socketio/index.js")(http);
const lobby = require("./lobby/index.js")(io);

// Server listens on port
http.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
