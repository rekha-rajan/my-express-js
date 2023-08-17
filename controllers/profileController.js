const db = require('../config/db');
const Profile = db.Profile;
module.exports = {
    insertProfile,
};
async function insertProfile(employeeId, name, email, contact) {
    await Profile.create({employeeId, name, email, contact });
}