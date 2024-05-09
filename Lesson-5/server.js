const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// custom middleware
app.use(logger);

const whiteList = [
  "http://your-site.com",
  "https:localhost:3000",
  "http:www.google.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Built-in-middleware, to handle url encoded data in other word ---> form Data, "cont`: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

//to handle json responses
app.use(express.json());

//serving static files>>>>>>>>Static files are like image, txt, and css>>>>>>>>
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', "index.html"))
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html");
});

// ROUTE HANDLERS
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("You're trying to access hello.html");
    next(); //Next is been used to send our response after we've input hello.
  },
  (req, res) => {
    res.send("Hello Kenny, Aderayo and Hidee!!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("Finished!!!");
};

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404! Not Found" });
  } else {
    res.type("txt").send("404! Not Found");
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
