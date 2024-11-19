const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
  try {
    let token
    const authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]
      if (!token)
        return res
          .status(401)
          .json({ message: "Access denied, no token provided" })

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
          return res
            .status(401)
            .json({ message: "Access denied, user is not authorized" })
        req.admin = decoded
        next()
      })
    } else {
      res.status(401).json({ message: "Access denied, user is not authorized" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
