const db_conn = require('./sequelize-config');
const User = require('../models/users');
const Session = require('../models/session');

const conncetDB = async ()=>{
    await db_conn.authenticate();
    await db_conn.sync();
    await db_conn.sync({ force: process.env.IS_SYNC ==="true" });
    console.log('Connection has been established successfully');
}

module.exports = {
    conncetDB
}