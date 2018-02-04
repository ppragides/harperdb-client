"use strict";

// Let's require some node modules
var config = require('./config/config');

// Kill the process on SIGINT
process.on('SIGINT', function () {
  console.log('Got SIGINT.  Shutting down.');
  process.exit();
});

//Handle uncaught exceptions, to prevent process from terminating.
process.addListener("uncaughtException", function (err) {
    console.log("Uncaught exception: " + err);
});