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
app.use(cors({
  origin: process.env.MODE_ENV === 'production' 
    ? [process.env.PROD_DOMAIN] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

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


