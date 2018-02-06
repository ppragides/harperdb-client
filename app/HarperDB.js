var self;
// Include native http nodejs module
var http   = require("http");


var HarperDB = function(config) {
	this.config = config;
	self = this;
	return self;

};

HarperDB.prototype = {
    constructor: HarperDB,

    echo: function(req, res, next) {
        console.log("got a request");
        res.send("200");
        return next();
    },

    request: function(options, data, cb) {
        // Setup your request.
        var req = http.request(options,function(res){

            res.setEncoding('utf8');
            var body = "";
            // Function to handle the data event from the res
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on("end",function(){
                var error = null;
                return cb(error,body);
            });

        });

        // If there is a request error, handle it.
        req.on('error', function(e) {
            return cb(new Error("Problem with upstream request."),null);
        });

        if ( data !== null ) {
            req.write(data);
        }
        // This actually kicks off the request
        req.end();
    }
};

module.exports = {
    HarperDB: HarperDB
};