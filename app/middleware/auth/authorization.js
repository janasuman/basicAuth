const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const Session = require('../../models/session');

const tokenCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const cachedUser = tokenCache.get(token);
    if (cachedUser) {
        req.authdata = cachedUser;
        return next();
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const sess = await Session.findOne({
            where: {
                SessionId: user.SessionId
            }
        });
        if (!sess) return res.status(403).json({ message: 'Session does not exist' });

        tokenCache.set(token, user);
        req.authdata = user;
        next();
    });
}

const CreateJwtToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '25m', // Token expiration time
    });

    return 'Bearer ' + token;
}

module.exports = {
    authorization,
    CreateJwtToken
}
