const express = require('express');
const dockerRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Docker = require('dockerode');
const docker = new Docker({host: '0.0.0.0', port: 2375});

// API Authentification
dockerRouter.use(authMiddleware);

// Container Status
dockerRouter.get('/status/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const container = docker.getContainer(id);
        const data = await container.inspect();
        res.json(data.State);
    } catch (error) {
        res.send(`Failed to get status of container ${id}: ${error.message}`);
    }
});

// Container start
dockerRouter.post('/start/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const container = docker.getContainer(id);
        await container.start();
        res.send(`Container ${id} started successfully`);
    } catch (error) {
        res.send(`Failed to start container ${id}: ${error.message}`);
    }
});

// Container stop
dockerRouter.post('/stop/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const container = docker.getContainer(id);
        await container.stop();
        res.send(`Container ${id} stopped successfully`);
    } catch (error) {
        res.send(`Failed to stop container ${id}: ${error.message}`);
    }
});

module.exports = dockerRouter;