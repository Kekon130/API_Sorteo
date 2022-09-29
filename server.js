const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = require('./app');

require('dotenv').config();

//Need to make a .env flie and add the variables
const port = process.env.PORT || 3000;
const db_URL= process.env.DATABASE_URL || 'localhost'

app.listen(port, ()=>{
    console.log(`API listen in localhost: ${port}`);
})