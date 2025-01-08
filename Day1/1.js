const http = require("http");
const port = 2222;

const Hello = (req, res) => {
  res.write("<h1>Helloooo........ <br> Server is running </h1>");
  res.end();
};

const server = http.createServer(Hello);

server.listen(port, (err) => {
  err ? console.log(err) : console.log(" Server running at port no. : " + port);
});
