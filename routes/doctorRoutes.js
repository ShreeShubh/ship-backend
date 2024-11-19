const express = require("express")
const router = express.Router()
const {
  getDoctor,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController")
const { verifyToken } = require("../middleware/authMiddleware")

// Apply middleware to all routes in this router
//router.use(verifyToken)

router.route("/").get(getDoctors).post(createDoctor)
router.route("/:id").get(getDoctor).put(updateDoctor).delete(deleteDoctor)

module.exports = router
