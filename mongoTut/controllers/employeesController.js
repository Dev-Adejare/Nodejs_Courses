const Employee = require("../model/Employee");
const User = require("../model/User");

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

if (!newEmployee.firstname || !newEmployee.lastname) {
  return res.status(400).json({
    message: "Firsy and last name is required thank yearsToQuarters.😊",
  });
}
data.setEmployee([...data.employees, newEmployee]);

res.json(newEmployee);

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res
      .status(400)
      .json({ Message: `Employee with no ID: ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  if (req.body.role) employee.role = req.body.role;

  const filteredEmployee = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  const unsortedArray = [...filteredEmployee, employee];

  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res
      .status(400)
      .json({ Message: `Employee with no ID: ${req.body.id} not found` });
  }

  const filteredEmployee = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );

  data.setEmployee([...filteredEmployee]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res
      .status(400)
      .json({ Message: `Employee with no ID: ${req.params.id} not found` });
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
