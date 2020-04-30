const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec } = require('child_process')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/webhook", function (req, res) {
  const data = req.body;

  console.log("Request Body: " + JSON.stringify(data))

  let name = data.name || "world"

  console.log("[start execute shell script]")

  const myShellScript = exec(`sh ./scripts/hello.sh ${name}`)

  myShellScript.stdout.on('data', (data) => {
    console.log(`execute result: ${data}`)
  })

  myShellScript.stderr.on('data', (data) => {
    console.error(`execute error: ${data}`)
  })

  res.status(200).send("ok");
});

let port = 3000;
let server = http.createServer(app);
server.listen(port);
console.log("Server is running at localhost:" + port);