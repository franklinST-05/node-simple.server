const Server = require("./server");
const crypto = require("node:crypto");

const { log } = require("node:console");
const { client } = require("./database");

const app = new Server();
client.connect();

app.route("GET", "/tasks", (req, res) => {
    client.query("SELECT * FROM task", (error, data) => {
        if (error) {
            res.statusCode = 500;
            return res.end();
        }

        res.statusCode = 201;
        return res.end(JSON.stringify(data.rows));
    });
});

app.route("POST", "/task", (req, res) => {

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString()
    });

    req.on("end", () => {
        const user = JSON.parse(body);

        const sql = "INSERT INTO task (id,title, description) VALUES ($1, $2, $3)";
        const values = [crypto.randomUUID(), user.title, user.description];

        client.query(sql, values, (error, data) => {
            if (error) {
                res.statusCode = 500;
                return res.end(error.message);
            }

            res.statusCode = 201;
            return res.end();

        });

    });
});

app.route("PUT", "/task", (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        body = JSON.parse(body);
        
        const sql = "UPDATE task SET title = $1, description = $2 WHERE id = $3";
        const values = [body.title, body.description, body.id];

        client.query(sql,values, (error, data) => {
            if(error) {
                res.statusCode = 500;
                return res.end();
            }

            req.statusCode = 200;
            res.end();
        })

    });
});

app.route("DELETE", "/task", (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        body = JSON.parse(body);
        
        const sql = "DELETE FROM task WHERE id = $1";
        const values = [body.id];

        client.query(sql,values, (error, data) => {
            if(error) {
                res.statusCode = 500;
                return res.end(error.message);
            }

            req.statusCode = 200;
            res.end();
        })

    });
});

app.listen(8080, "localhost", (port) => {
    log(port, "Server is running...");
})
