const express = require("express")
const router = express.Router()
const {
  getPatients,
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController")
const { verifyToken } = require("../middleware/authMiddleware")

// Apply middleware to all routes in this router
//router.use(verifyToken)

router.route("/").get(getPatients).post(createPatient)
router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient)

module.exports = router
