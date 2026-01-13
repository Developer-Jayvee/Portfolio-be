require('dotenv').config();
const express = require('express')
const app = express()
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser')
const { sendEmail } = require('./services/SendEmailService');
const { log } = require('console');
const port = 3000

//  FOR LOADING ENV

// API
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.PROD_DOMAIN  
    : '*',
  methods: ['GET' ,'POST',  'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/send-email',async (req, res) => {
  const request = JSON.stringify(req.body, null, 2);
  const response = await sendEmail(request);
  res.send(response)
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})


