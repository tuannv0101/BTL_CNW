const jwt = require('jsonwebtoken')

// Authorization: Bearer <token> (for JWT)
// status 401 Unauthorized
// status 403 Forbidden

const verifyToken = (req, res, next) => {

    const headerAuth = req.header('Authorization')
    const token = headerAuth && headerAuth.split(' ')[1] // Bearer <token>

    if (!token) return res.status(401).json({ success: false, message: "Token not found" })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, message: "Invalid token" })
    }
}

module.exports = verifyToken
