const jwt = require('jsonwebtoken')

// check token
const Authenticate = async(req, res, next) => {
    const authHeader = req.header('Authorization').split(" ")[1]

    if (!authHeader){
        return res.json('Token not found !')
    }
   
    try {
		const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET)
		req.userId = decoded.userId
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: error.message })
	}
}

module.exports = { Authenticate }