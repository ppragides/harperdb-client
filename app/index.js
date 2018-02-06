"use strict";

// Let's require some node modules
var HarperDBClient =  require('./HarperDB');
var config =          require('./config/config');
var restify =         require('restify');

var appConfig = config.config.app;
var harperConfig = config.config.harperdb;

// Kill the process on SIGINT
process.on('SIGINT', function () {
  console.log('Got SIGINT.  Shutting down.');
  process.exit();
});

//Handle uncaught exceptions, to prevent process from terminating.
process.addListener("uncaughtException", function (err) {
    console.log("Uncaught exception: " + err);
});

// Instantiate a new HarperDBClient object to be used for request handling
var HarperClient = new HarperDBClient.HarperDB(harperConfig);

//Setup the Restify Server Object
var server = restify.createServer({
    name:"HarperDB Client",
    version: '0.0.1'
});

//Setup the query parser, to split up the query into a workable object.
server.use(restify.queryParser());

// Set up body parser so we can read the PUT requests into a workable object.
server.use(restify.bodyParser());

/**
 * 
 * Server is ready, let's set up the routes 
 * 
 */
server.get('/', HarperClient.echo);


//******************    START LISTENING ON PORT      ********************//
server.listen(appConfig.listenPort, function() {
    console.log('%s listening at %s', server.name, server.url);
});