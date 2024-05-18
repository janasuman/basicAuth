require('dotenv').config();
const app = require('./app/app');
const {conncetDB} = require('./app/lib/db-handeler');

const start = ()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server is running on",process.env.PORT || 3000);
        conncetDB();
    })
}
start();