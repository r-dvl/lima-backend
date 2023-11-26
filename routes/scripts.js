const express = require('express');
const scriptsRouter = express.Router();
const { exec } = require('child_process');


// Camera ON
scriptsRouter.post('/cat-watcher/on', (req, res) => {
    exec(`docker start cat-watcher`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('Server cat-watcher on.');
    });
});

// Camera OFF
scriptsRouter.post('/cat-watcher/off', (req, res) => {
    exec('docker stop cat-watcher', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('Server cat-watcher off.');
    });
});

module.exports = scriptsRouter