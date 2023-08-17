const config=require('./config/config')
const express =require('express');


const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const  sequelize = db.sequelize;  
const app = express();


app.use(bodyParser.json());
app.use(cors());
const empRoute = require('./routes/employeeRoute');
const companyRoute = require('./routes/companyRoute');
const profileRoute = require('./routes/profileRoute');
const projectRoute = require('./routes/projectRoute');
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use('/employee', empRoute);
app.use('/company', companyRoute);   
app.use('/profile', profileRoute);
app.use('/project', projectRoute);
app.listen(config.port, ()=>{
    console.log(`server is listening  on ${config.port}`);
});
 
module.exports = app;