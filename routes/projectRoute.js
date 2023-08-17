const express = require('express');
const projectRouter = express.Router();
const { insertProject} = require('../controllers/projectController');
// Create an employee



projectRouter.post('/', async (req, res, next) => {
    try {
        const name = req.body.project.name;
        if (!name) {
            return res.sendStatus(400);
        }
        const project = await insertProject(name).then(() => res.json({ message: 'Project created.' }));
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

module.exports = projectRouter;