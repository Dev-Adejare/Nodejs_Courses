const express = require("express");
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

const path = require("path");

//first-method
// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "..", "data", "employees.json"));
// });

router
    .route("/")
    .get((req, res) => {
        res.json(data.employees);
    })

module.exports = router;
