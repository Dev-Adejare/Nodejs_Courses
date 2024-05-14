const express = require("express");
const router = express.Router(); 
const employeesController = require("../../controllers/employeesController")

const path = require("path");

//  first method.
// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "..", "data", "employees.json"))
// })

router
    .route("/")
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

    router.route("/:id").get(employeesController.getEmployee)

module.exports = router;