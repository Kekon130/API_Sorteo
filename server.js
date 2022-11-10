const app = require('./utils/app');


app.listen(process.env.PORT, ()=>{
    console.log(`API listen in localhost: ${process.env.PORT}`);
})