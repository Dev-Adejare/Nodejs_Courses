const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvent");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const serverFile = async ( filepath, contentType, response) => {

try {
    const data = await fsPromises.readFile(filepath, 'utf8');
    response.writeHead(200, {'content-Type':contentType});
    response.end(data);
    
} catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end();
    
}
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filepath;

  if (contentType === "text/html" && req.url === "/") {
    filepath = path.join(__dirname, "views", "index.html");
  } else if (contentType === "text/html" && req.url.slice(-1) === "/") {
    filepath = path.join(__dirname, "views", req.url);
  } else if (contentType === "text/html") {
    filepath = path.join(__dirname, "views", req.url);
  } else {
    filepath = path.join(__dirname, req.url);
  }

  if(!extension && req.url.slice(-1) !== '/') filepath += '.html';

  const fileExists = fs.existsSync(filepath)

  if(fileExists) {

  }else {
    switch(path.parse(filepath).base) {
        case 'old-page.html':
            res.writeHead(301, { 'location': '/new-page.html' });
            break
            case 'www-page.html':
            res.writeHead(301, { 'location': '/' });
            res.end();
            break
            default:
  }
}});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// myEmitter.on("log", (msg) => logEvents(msg));

// setTimeout(() => {
//     myEmitter.emit("log", "Log event emitted")
// }, 2000);
