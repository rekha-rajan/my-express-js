const db = require('../config/db');
const Profile = db.Project;
module.exports = {
    insertProject,
};
async function insertProject(name) {
    await Profile.create({name});
}