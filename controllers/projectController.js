const db = require('../config/db');
const Profile = db.Project;
module.exports = {
    insertProject,
};
async function insertProject(projectName) {
    await Profile.create({projectName});
}