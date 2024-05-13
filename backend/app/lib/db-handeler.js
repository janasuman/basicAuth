const db_conn = require('./sequelize-config');
const User = require('../models/users');
const Session = require('../models/session');

const conncetDB = async ()=>{
    await db_conn.authenticate();
    if (process.env.IS_SYNC ==="true") await dbSync();
    // await db_conn.sync({ force: process.env.IS_SYNC ==="true" });
    console.log('Connection has been established successfully');
}

const dbSync = async() =>{
    await db_conn.sync({force:true});
    return 'Database recreated'
}

module.exports = {
    conncetDB,
    dbSync
}