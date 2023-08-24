const express = require('express');
const scriptsRouter = express.Router();
const { exec } = require('child_process');


scriptsRouter.post('/server/cat-watcher/on', (req, res) => {
    const { version } = req.body;

    exec(`sudo bash /opt/apps/cat-watcher/start.sh ${version}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('cat-watcher on.');
    });
});

scriptsRouter.post('/server/cat-watcher/off', (req, res) => {

    exec('sudo pm2 stop cat-watcher', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('cat-watcher off.');
    });
});

module.exports = scriptsRouter