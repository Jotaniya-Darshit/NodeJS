const http = require('http');
const port = 1009;

const portHandler = (req,res) => {
    res.write("<h1>Hello.... Server is running</h1>");
    res.end();
}

const server = http.createServer(portHandler);

server.listen(port, (err) => {
    err ? console.log(err ) : console.log("Server listening on port : " + port);
})