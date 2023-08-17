const db = require('../config/db');
const Company = db.Company; 
const Employee = db.Employee;

module.exports = {
    insertCompany,
    getAllCompany,
    getOneCompanyEmployees
};

async function insertCompany(name) {
    await Company.create({name});
}

async function getAllCompany() {
    const company = await Company.findAll();
    return company;
}

async function getOneCompanyEmployees(id) {
    console.log(id);
    const company = await Company.findByPk(id, { include: [Employee] });
	 
   return company;

}

// async function updateSalary(sgrade, salary, hra, id) {
//     await Salary.update({ sgrade, salary, hra }, { where: { id: id } });
// }

// async function deleteSalary(id) {
//     const salary = await getOneSalary(id);
//     await salary.destroy();
// }

// async function getOneSalary(id) {
//     const salary = await Salary.findByPk(id);
//     return salary;
// }