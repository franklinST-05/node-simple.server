const http = require("node:http");

class Server {

    routes = [];
    server = null;

    route(method, path, callback) {
        this.routes[path] = (req, res) => {
            if (req.url === path && req.method === method) {
                return callback(req, res);
            }
        }
    }

    listen(port, host, callback) {

        this.server = http.createServer((req, res) => {
            if(this.routes[req.url]) {
                this.routes[req.url](req, res);
            } else {
                res.statusCode = 404;
                res.end();
            }
        });

        this.server.listen(port, host, () => callback(port));

    }
}

module.exports = Server;