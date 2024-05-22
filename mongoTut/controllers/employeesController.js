const Employee = require("../model/Employee");

// const getAllEmployees = async ((req, res) => {})
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ Message: "No employees found" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ Message: "firstname and lastname are required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
}; 

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ Message: "ID parameter is required" });
  }


  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ Message: `No employee matches ID ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();

  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ Message: "Employee ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches: ID ${req.body.id}` });  //req.body.id is typically used in POST, PUT, and PATCH requests where the body contains data.
  }
  const result = await employee.deleteOne();
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ Message: "Employee ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();  // req.params.id is typically used in GET, PUT, and DELETE requests where the URL contains data.


  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee with ID: ${req.params.id}` });
  }
  res.json(employee);
};
module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
