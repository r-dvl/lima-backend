const express = require('express');
const scriptsRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { exec } = require('child_process');


// API Authentification
scriptsRouter.use(authMiddleware);

// Container Status
scriptsRouter.get('/status/:containerId', (req, res) => {
    const containerId = req.params.containerId;
    const command = `docker ps --filter "id=${containerId}" --format "{{.Status}}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        const isOnline = stdout.includes('Up');
        res.send(isOnline ? 'Online' : 'Offline');
    });
});

// Container start
scriptsRouter.get('/start/:containerId', (req, res) => {
    const containerId = req.params.containerId;
    exec(`docker start ${containerId}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        res.send('Container started');
    });
});

// Container stop
scriptsRouter.get('/stop/:containerId', (req, res) => {
    const containerId = req.params.containerId;
    exec(`docker stop ${containerId}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        res.send('Container stopped');
    });
});

module.exports = scriptsRouter;