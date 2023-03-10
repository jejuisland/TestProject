const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mysql = require('mysql2/promise');
const config = require('./utils/db-config');
require("dotenv").config();

const app = express();
const port = 3000;

// Configure database connection pool
const pool = mysql.createPool(config);

// Swagger API documentation options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'IMS Home Phone Subscriber Service API',
        version: '1.0.0',
        description: 'API for managing home phone subscribers on the IMS platform',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
        },
      ],
    },
    apis: ['./swagger-docs/swagger.js'],
  };
  
  // Initialize Swagger UI and documentation endpoint
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use('/ims/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(bodyParser.json());

  // APIS METHOD
  app.get('/ims/subscriber/:phoneNumber', async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const connection = await pool.getConnection();
  
    try {
      const [rows] = await connection.query('SELECT * FROM subscriber WHERE phoneNumber = ?', [phoneNumber]);
  
      if (rows.length === 0) {
        res.status(404).send({ error: 'Subscriber not found' });
      } else {
        res.send(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } finally {
      connection.release();
    }
  });
  
  app.post('/ims/subscriber', async (req, res) => {
    const subscriber = req.body;
    const connection = await pool.getConnection();

    try {
      // validate first if Subscriber Phone Number Existing
      const [rows] = await connection.query('SELECT * FROM subscriber WHERE phoneNumber = ?', [subscriber.phoneNumber]);
  
      if (rows.length > 0) {
        res.status(409).send({ error: 'Subscriber already exists' });
      } else {
        await connection.query('INSERT INTO subscriber (phoneNumber, username, password, domain, status, features) VALUES (?, ?, ?, ?, ?, ?)', [subscriber.phoneNumber, subscriber.username, subscriber.password, subscriber.domain, subscriber.status, `${JSON.stringify(subscriber.features)}`]);
        res.status(201).send(subscriber);
      }
    } catch (err) { 
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } finally {
      connection.release();
    }
  });
  
  app.put('/ims/subscriber/:phoneNumber', async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const subscriber = req.body;
    const connection = await pool.getConnection();
    try {

      // validate first if Subscriber Phone Number Existing
      const [rows] = await connection.query('SELECT * FROM subscriber WHERE phoneNumber = ?', [phoneNumber]);
  
      if (rows.length === 0) {
        res.status(404).send({ error: 'Subscriber not found' });
      } else {
        await connection.query('UPDATE subscriber SET phoneNumber = ? , username = ? , password = ? , domain= ? , status= ? , features = ? WHERE phoneNumber = ?', [subscriber.phoneNumber, subscriber.username, subscriber.password, subscriber.domain, subscriber.status, `${JSON.stringify(subscriber.features)}`, phoneNumber]);
        res.send(subscriber);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } finally {
      connection.release();
    }
  });
  
  app.delete('/ims/subscriber/:phoneNumber', async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const connection = await pool.getConnection();
  
    try {

      // validate first if Subscriber Phone Number Existing
      const [rows] = await connection.query('SELECT * FROM subscriber WHERE phoneNumber = ?', [phoneNumber]);
  
      if (rows.length === 0) {
        res.status(404).send({ error: 'Subscriber not found' });
      } else {
        await connection.query('DELETE FROM subscriber WHERE phoneNumber = ?', [phoneNumber]);
        res.sendStatus(204);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } finally {
      connection.release();
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });