const express = require('express');
const scriptsRouter = express.Router();
const { exec } = require('child_process');


// Camera ON
scriptsRouter.post('/cat-watcher/on', (req, res) => {
    exec(`docker start cat-watcher`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('Error executing script.');
        }
        res.send('Server cat-watcher on.');
    });
});

// Camera OFF
scriptsRouter.post('/cat-watcher/off', (req, res) => {
    exec('docker stop cat-watcher', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send('Error executing script.');
        }
        res.send('Server cat-watcher off.');
    });
});

module.exports = scriptsRouter