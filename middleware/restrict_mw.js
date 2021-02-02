const jwt = require("jsonwebtoken")

const roles = ["basic", "admin"]

function restrict(role) {
	return async (req, res, next) => {
		try {
			
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "Invalid credentials",
				})
			}

			
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "Invalid credentials",
					})
				}

				
				if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
					return res.status(401).json({
						message: "Invalid credentials",
					})
				}

				
				req.token = decoded

				
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {restrict}