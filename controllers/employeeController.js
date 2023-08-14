const db = require('../config/db');
const Employee = db.Employee;
module.exports = {
    insertEmployee,
    updateEmployee,
    getOneEmployee,
    getAllEmployees,
    deleteEmployee

};
async function insertEmployee(name, designation, email, age) {
    await Employee.create({ name, designation, email, age });
}
async function updateEmployee(name, designation, email, age, id) {
    await Employee.update({ name, designation, email, age }, { where: { id: id } });
}
async function getOneEmployee(id) {
    const employee = await Employee.findByPk(id);
    return employee;
}
async function getAllEmployees() {
    const employees = await Employee.findAll();
    return employees;
}
async function deleteEmployee(id) {
    const employee = await getOneEmployee(id);
    await employee.destroy();
}
