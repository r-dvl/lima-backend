const express = require('express');
const scriptsRouter = express.Router();
const { exec } = require('child_process');

//// SERVER ////
// Camera ON
scriptsRouter.post('/server/cat-watcher/on', (req, res) => {
    const { version } = req.body;

    exec(`sudo bash /opt/apps/cat-watcher/start.sh ${version}`, (error, stdout, stderr) => {
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
scriptsRouter.post('/server/cat-watcher/off', (req, res) => {

    exec('sudo pm2 stop cat-watcher', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('Server cat-watcher off.');
    });
});

//// RPi ////
// Camera ON
scriptsRouter.post('/rpi/cat-watcher/on', (req, res) => {
    const { version } = req.body;

    exec(`sudo bash /opt/apps/cat-watcher/start_remote.sh ${version}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('RPi cat-watcher on.');
    });
});

// Camera OFF
scriptsRouter.post('/rpi/cat-watcher/off', (req, res) => {

    exec('sudo bash /opt/apps/cat-watcher/stop_remote.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing script.');
        }

        console.log(`Script output: ${stdout}`);
        console.error(`Script errors: ${stderr}`);

        res.send('Rpi cat-watcher off.');
    });
});

module.exports = scriptsRouter