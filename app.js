const express = require('express');
const { PrismaClient } = require('@prisma/client')

const sellerPath= require('./routes/sellerRoutes');

const prism = new PrismaClient();
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/seller',sellerPath);

app.use('/',(req,res)=>{
    res.send('Api Sorteo Core Navidad');
})

module.exports=app;