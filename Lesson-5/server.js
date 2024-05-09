const express = require('express');
const app = express();
const path = require("path");




const PORT = process.env.PORT || 3500;

//serving static files>>>>>>>>Static files are like image, txt, and css>>>>>>>>
app.use(express.static(path.join(__dirname)))

app.get()

app.listen(PORT, () => console.log(`server running on port ${PORT}`));




