const express = require('express');

const sellerPath= require('./routes/sellerRoutes');
const ticketPath = require('./routes/ticketRoute');
const clientPath = require('./routes/clientRoutes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/seller',sellerPath);
app.use('/ticket',ticketPath);
app.use('/client',clientPath);

app.use('/',(req,res)=>{
    res.status(200).send('Api Sorteo Core Navidad');
})

module.exports=app;