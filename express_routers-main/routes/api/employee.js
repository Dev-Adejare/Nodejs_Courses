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
    .post((req, res) => {
        res.json({
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: "Tutor"
        });
    })
    .put((req, res) => {
        res.json({
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role
        });
    })
    .delete((req, res) => {
        res.json({
            id: req.body.id
        });
    })

    router.route('/:id').get((req, res) => {
        // res.json({id: req.params.id});
        const id = parseInt(req.params.id);
        const item = data.employees.find(item => item.id === id)

        if (!item) {
            res.status(404).json({
                'Message': 'Not Found'
            })
        } else {
            res.json(item)
        }
    
    })

module.exports = router;
           
