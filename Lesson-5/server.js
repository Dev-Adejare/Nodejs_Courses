const express = require('express');
const app = express();
const path = require("path");




const PORT = process.env.PORT || 3500;

//serving static files>>>>>>>>Static files are like image, txt, and css>>>>>>>>
app.use(express.static(path.join(__dirname, 'public')))

app.get("^/$|/index(.html)?", (req, res) => {

  // res.sendFile("./views/index.html", {root: __dirname})
  res.sendFile(path.join(__dirname, 'views', "index.html"))
})
app.get("/new-page(.html)?", (req, res) => {

  // res.sendFile(path.join(__dirname, 'views', "index.html"))
res.sendFile(path.join(__dirname, 'views', "new-page.html"))
})

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html")
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`));





