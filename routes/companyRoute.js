const express = require('express');
const companyRouter = express.Router();
const { insertCompany, getAllCompany, getOneCompanyEmployees} = require('../controllers/companyController');
// Create an employee

companyRouter.get('/', async (req, res, next) => {
    try {
        const company = await getAllCompany();
        res.status(200).json({ Company : company });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

companyRouter.post('/', async (req, res, next) => {
    try {
        const name = req.body.company.name;
        if (!name) {
            return res.sendStatus(400);
        }
        const Company = await insertCompany(name).then(() => res.json({ message: 'Company created.' }));
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

companyRouter.param('companyId', async (req, res, next, companyId)=> {
    try {
        console.log(companyId);
        const company = await getOneCompanyEmployees(companyId);
        req.company = company;
        next(); // go to apiRouter.get('/:companyId')
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
 });

 companyRouter.get('/:companyId',  (req, res, next)=>{
    res.status(200).json({company: req.company});
 });

module.exports = companyRouter;