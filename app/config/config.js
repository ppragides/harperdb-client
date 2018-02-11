"use strict";

var config = {
    harperdb: {
        protocol: "http:",
        host: "localhost",
        http_port: 9925,
        https_port: 31283,
        path: "",
        method: "POST",
        authToken: "SERCX0FETUlOOnBvbnRpMTAx"
    },
    app: {
        listenPort: 8080
    }
};

module.exports = {
    config: config
};