const http = require("http");
const path = require("path");


// const logEvents = require("./logEvent");
const EventEmitter = require("events");
const logEvent = require("./logEvent");
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();
emitter.on('log', (msg, fileName) => logEvent(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filepath, contentType, response) => {
  try {
    const rawdata = await fsPromises.readFile(
      filepath,
      !contentType.includes('image') ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawdata) : rawdata;
    response.writeHead(filepath.includes("404.html") ? 404 : 200, {
      "content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    emitter.emit("log", `${error.name}: ${error.message}`, 'errorLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emitter.emit("log", `${req.url}\t${req.method}`, 'reqLog.txt');

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

    //Users/user/desktop/my web/nodejs/lesson-4 => directory = _dirname
    //views
    //index.html
    //whenever someone inputs '/' as the url
    //the file path = Users/user/desktop/my web/nodejs/lesson-4/views/index.html
  } else if (contentType === "text/html" && req.url.slice(-1) === "/") {
    filepath = path.join(__dirname, "views", req.url);

    //Users/user/desktop/my web/nodejs/lesson-4 => directory = _dirname
    //views
    //req.url when the '/' is the last character like '/old/' or '/me/'
    //the file path = Users/user/desktop/my web/nodejs/lesson-4/views/me
  } else if (contentType === "text/html") {
    filepath = path.join(__dirname, "views", req.url);
  } else {
    filepath = path.join(__dirname, req.url);
  }

  if (!extension && req.url.slice(-1) !== "/") filepath += ".html";
  //the file path = Users/user/desktop/my web/nodejs/lesson-4/views/me.html or the file path = Users/user/desktop/my web/nodejs/lesson-4/views/me/
  //for example User/user/desktop/my web/nodejs/lesson-4/me add .html because there is no extension name and there no '/' at the end

  const fileExists = fs.existsSync(filepath);
  //the file path = Users/user/desktop/my web/nodejs/lesson-4/views/me.html or the file path = Users/user/desktop/my web/nodejs/lesson-4/views/me.html is created
  //it checks our computer to see if this path is in the computer

  if (fileExists) {
    serveFile(filepath, contentType, res);
    //if the filepath exists
    //now serve the everything about that file to the client
  } else {
    switch (path.parse(filepath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" }); // writeHead=>This is a method used to set the HTTP response headers before sending the response body.
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// myEmitter.on("log", (msg) => logEvents(msg));



