const express = require('express');

const sellerPath= require('./routes/sellerRoutes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/seller',sellerPath);

module.exports=app;