const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');


const { dbhost, dbport, dbuser, dbpassword, database, dbdialect } = config.database;
   
const pool =  mysql.createPool({
   host:dbhost,
   port:dbport,
   user: dbuser, password:dbpassword });
 
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

const db = {};

const sequelize = new Sequelize(database, dbuser, dbpassword, { dialect: dbdialect,
pool: {
   max: parseInt(config.pool.max),
   min: parseInt(config.pool.min),
   acquire: config.pool.acquire,
   idle: config.pool.idle
   }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = require('../models/employee')(sequelize, Sequelize);
db.Company = require('../models/company.js')(sequelize, Sequelize);
db.Profile = require('../models/profile.js')(sequelize, Sequelize);
db.Project = require('../models/project.js')(sequelize, Sequelize);


db.Employee.hasOne(db.Profile);
db.Profile.belongsTo(db.Employee)

db.Company.hasMany(db.Employee);
db.Employee.belongsTo(db.Company) //db.Profile.belongsTo(db.Employee, { foreignKey: "employeeId" })


db.Employee.belongsToMany(db.Project, { through: 'employee_project' });
db.Project.belongsToMany(db.Employee, { through: 'employee_project' });

db.Employee_Project = require('../models/employee_project.js')(sequelize, Sequelize, db.Employee, db.Project);

sequelize.sync({alter:true});
module.exports = db;                                                                    