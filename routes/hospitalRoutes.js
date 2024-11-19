const express = require("express")
const router = express.Router()
const {
  createHospital,
  getHospitals,
  getHospital,
  updateHospital,
  deleteHospital,
  assignDoctorToHospital,
} = require("../controllers/hospitalController")
const { verifyToken } = require("../middleware/authMiddleware")

// Apply middleware to all routes in this router
//router.use(verifyToken)

router.route("/").post(createHospital).get(getHospitals)
router.route("/:id").get(getHospital).put(updateHospital).delete(deleteHospital)
router.route("/:hospitalId/doctors/:doctorId").put(assignDoctorToHospital)

module.exports = router
