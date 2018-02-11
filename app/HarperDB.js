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

    get: function(req, res, next) {
        console.log(req.url);
        var req_data = {
            "operation": "search_by_value",
            "schema": "golftv_dev",
            "table": "videos",
            "hash_attribute": "id",
            "search_attribute": "id",
            "search_value": "*",
            "get_attributes": "*"            
        }

        var options = self.getOptions();

        // Fire off the request and process the response
        self.request(options, JSON.stringify(req_data), function(err, data){
            // Error is not null; something went wrong with the request.
            if (err != null) {
                res.send(400, err);
            }
            else {
                res.send(200, data);
                return next();
            }
        });

    },

    delete: function(req, res, next) {

        var req_data = {
            "operation": "delete",
            "schema": "golftv_dev",
            "table": "videos",
            "hash_values": [1]          
        }

        var options = self.getOptions();    

        // Fire off the request and process the response
        self.request(options, JSON.stringify(req_data), function(err, data){
            // Error is not null; something went wrong with the request.
            if (err != null) {
                res.send(400, err);
            }
            else {
                res.send(200, data);
                return next();
            }
        });
    },

    update: function(req, res, next) {
        var req_data = {
            "operation": "update",
            "schema": "golftv_dev",
            "table": "videos",
            "records": [{}]       
        }

        var options = self.getOptions();    

        // Fire off the request and process the response
        self.request(options, JSON.stringify(req_data), function(err, data){
            // Error is not null; something went wrong with the request.
            if (err != null) {
                res.send(data.statusCode, err);
            }
            else {
                res.send(200, data);
                return next();
            }
        });
    },

    save: function(req, res, next) {
        var req_data = {
            "operation": "insert",
            "schema": "golftv_dev",
            "table": "videos",
            "records": [{}]
        }

        var options = self.getOptions();    

        // Fire off the request and process the response
        self.request(options, JSON.stringify(req_data), function(err, data){
            // Error is not null; something went wrong with the request.
            if (err != null) {
                res.send(400, err);
            }
            else {
                res.send(200, data);
                return next();
            }
        });
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
    },

    getHeaders: function() {
        var headers = {
            "Content-Type": "application/json",
            "Authorization": "Basic " + self.config.authToken
        }

        return headers;
    },

    getOptions: function() {
        var options = {
            protocol: self.config.protocol,
            hostname: self.config.host,
            port: self.config.http_port,
            path: self.config.path,
            method: self.config.method,
            headers: self.getHeaders()
        };        

        return options;        
    }
};

module.exports = {
    HarperDB: HarperDB
};