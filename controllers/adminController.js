const Admin = require("../models/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc Register Admin
//@route POST /api/admin/register
//@access public
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const adminAvailable = await Admin.findOne({ email })
    if (adminAvailable)
      return res.status(400).json({ message: "Admin already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    })

    res
      .status(201)
      .json({ _id: admin._id, name: admin.name, email: admin.email })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Login Admin
//@route POST /api/admin/login
//@access public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: "Admin not found" })

    // verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const payload = {
      id: admin._id,
      username: admin.name,
      email: admin.email,
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    })
    res.status(200).json({
      accessToken,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerAdmin, loginAdmin }
