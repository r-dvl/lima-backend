/**
 * This module provides a Docker API wrapper.
 * @module dockerRouter
 */

// Import necessary modules
const express = require('express');
const dockerRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Docker = require('dockerode');
const docker = new Docker({ host: '192.168.1.55', port: 2375 });

// Use authentication middleware
dockerRouter.use(authMiddleware);

/**
 * Endpoint to get the status of a container.
 * @name get/status/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Endpoint to start a container.
 * @name post/start/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Endpoint to stop a container.
 * @name post/stop/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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