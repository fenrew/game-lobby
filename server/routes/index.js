const router = require("express").Router();
const basicRoutes = require("./basic-routes.js");

// Gathers all routes, and will be added to the app in server.js
router.use("/", basicRoutes);

module.exports = router;
