const { log } = require("node:console");
const Server = require("./server");

const app = new Server();

app.route("GET", "/", (req, res) => {
    res.end("BEM VINDO!");
});

app.route("GET", "/task", (req, res) => {
    res.end("AINDA NÃO IMPLEMENTADO!");
});



app.listen(8080, "localhost", (port) => {
    log(port, "Server is running...");
})
