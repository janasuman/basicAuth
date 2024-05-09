require('dotenv').config();
const app = require('./app/app');
const db_conn = require('./app/lib/sequelize-config');
const User = require('./app/models/users');
const Session = require('./app/models/session');


app.listen(process.env.PORT || 3000, async()=>{
    await db_conn.authenticate();
    await db_conn.sync();
    // await db_conn.sync({ force: true });
    console.log('Connection has been established successfully');
    console.log("Server is running on",process.env.PORT || 3000);
})