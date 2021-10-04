const http = require('http');
const morgan = require('morgan');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');
const router = require('./router.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(morgan('combined'));


    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from      
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/api', router);

    app.use(cors())

    app.get('/', (req, res) => {
      res.end('Ingrese /api para navegar!');
    });

    app.get('/test', async (req, res) => {
      const result = await database.simpleExecute('select user, systimestamp from dual');
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;

      res.end(`Usuario de la base de datos: ${user}\nfecha: ${date}`);
    });

    httpServer = http.createServer(app);

    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Web server listening on localhost:${webServerConfig.port}`);
      resolve();
    });
  });
}

module.exports.initialize = initialize;