const Password = require('../service/password');
const users = require('../models/users');
const Session = require('../models/session');
const {CreateJwtToken} = require('../middleware/auth/authorization');
const crypto = require('crypto');
const signup = async(userData) =>{
    try {
    const {Username,password,Email,FullName} = userData;
    const existinguser = await users.findOne({
        where:{
            Username:Username,
            Email:Email
        }
    });

    if (existinguser) throw new Error('User already exist');

    const PasswordHash = await Password.toHash(password);

    await users.create({Username,Email,FullName,PasswordHash});

    return 'user created successfully'
        
    } catch (err) {
        throw new Error(err)
    }

}

const login = async(userData) =>{
    try {
        const {Username,password} = userData;
        const existinguser = await users.findOne({
            where:{
                Username:Username
            }
        });
        if (!existinguser) throw new Error('User does not exist');
        const match = await Password.compare(existinguser.PasswordHash,password);
        if (!match) throw new Error('Password is not valid');
        const sessionId = crypto.randomUUID();
        const checkSession = await Session.findOne({
            where:{
                userId:existinguser.UserID
            }
        });
        if(checkSession) await Session.destroy({
            where:{
            userId:existinguser.UserID
        }});
        await Session.create({
            userId:existinguser.UserID,
            expires:new Date(),
            SessionId:sessionId
        })
        const payload = {UserID:existinguser.UserID,Username:existinguser.Username,FullName:existinguser.FullName,SessionId:sessionId};
        const Token = CreateJwtToken(payload);
        return {Token};
    } catch (err) {
        throw new Error(err)
    }
}


const logout = async(authdata) =>{
    try {
        await Session.destroy({
            where:{
                SessionId:authdata.SessionId
            }
        });
        return 'User logout successfuly';
    } catch (err) {
       throw new Error(err);
    }
}

module.exports = {
    signup,login,logout
}