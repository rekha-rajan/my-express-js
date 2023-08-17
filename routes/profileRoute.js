const express = require('express');
const profileRouter = express.Router();
const { insertProfile} = require('../controllers/profileController');

profileRouter.post('/',  async (req, res, next)=>{
    try {
        const name = req.body.profile.name;
        const email = req.body.profile.email;
        const contact = req.body.profile.contact;
        const employeeId = req.body.profile.employeeId;
            if (!name || !email || !contact || !employeeId) {
            return res.sendStatus(400);
            }
        const profile =  await insertProfile(employeeId, name, email, contact).then(() => res.json({ message: 'profile created.' }));
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
 });
 module.exports = profileRouter;