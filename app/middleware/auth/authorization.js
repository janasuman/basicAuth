const jwt = require('jsonwebtoken')
const Session = require('../../models/session');
const authorization = (req,res,next)=>{
	const token = req.header('Authorization');
	if (!token) {
	  return res.status(401).json({ message: 'Unauthorized' });
	}
  
	jwt.verify(token.split(" ")[1], process.env.JWT_KEY, async(err, user) => {
	  if (err) {
		return res.status(403).json({ message: 'Forbidden' });
	  }
	  const sess = await Session.findOne({
		where:{
			SessionId:user.SessionId
		}
	  });
	  if (!sess) throw new Error('Session does not exist')
	  req.authdata = user;
	  next();
	});
}

const CreateJwtToken = (payload) =>{
	const token = jwt.sign(payload,process.env.JWT_KEY
	,{
		expiresIn: '15m', // Token expiration time
	});

	return 'Basic '+token;
}

module.exports = {
    authorization,
	CreateJwtToken
}