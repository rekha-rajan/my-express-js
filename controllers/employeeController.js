const db = require('../config/db');
const Employee = db.Employee;
const Profile = db.Profile;
const Project = db.Project;
const Employee_Project = db.Employee_Project;

module.exports = {
    insertEmployee,
    updateEmployee,
    getOneEmployee,
    getAllEmployees,
    deleteEmployee,
    findEmployeeProjects,
    junctionCreate,
};
async function insertEmployee(name, email, designation, age, contact, companyId, projectName) {
    const empData = await Employee.create({ name, designation, email, age, companyId });
    const employeeId = empData.id;
    await Profile.create({ employeeId, name, email, contact });
    const projectData = await Project.create({projectName});
    await empData.addProject(projectData);
}
async function updateEmployee(name, designation, email, age, id) {
    await Employee.update({ name, designation, email, age }, { where: { id: id } });
}
async function getOneEmployee(id) {
    const employee = await Employee.findByPk(id, {
        include: [
            {
                model: Profile,
                attributes: ["email", "contact"],

            },
        ],
    });
    return employee;
}
async function getAllEmployees() {
    const employees = await Employee.findAll({
        include: [
            {
                model: Project,
                attributes: ["projectName"],
                through: {
                    attributes: ["EmployeeId", "ProjectId"],
                }
            },
        ],
    });

    return employees;
}
async function deleteEmployee(id) {
    const employee = await getOneEmployee(id);
    await employee.destroy();
}

async function findEmployeeProjects(id) {

    const employee = await Employee.findByPk(id, {
        include: [
            {
                model: Project,
                attributes: ["projectName"],
                through: {
                    attributes: ["EmployeeId", "ProjectId"],
                }
            },
        ],
    });
    return employee;
}

async function junctionCreate(EmployeeId, ProjectId) {

    const employee_project = await Employee_Project.create({ EmployeeId, ProjectId });

    return employee_project;
}

