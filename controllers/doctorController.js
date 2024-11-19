const Doctor = require("../models/doctorModel")

//@desc Create Doctor
//@route POST /api/doctors
//@access private
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body)
    res.status(201).json(doctor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Read all Doctors
//@route GET /api/doctors
//@access private
const getDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find()
    res.status(200).json(doctor)
  } catch (error) {
    res.status(500).json({ mesage: error.mesage })
  }
}

//@desc Read Doctor by ID
//@route GET /api/doctors/:id
//@access private
const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) return res.status(404).json({ message: "Doctor not found" })
    res.json(doctor)
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

//@desc Update Doctor
//@route PUT /api/doctors/:id
//@access private
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body)
    if (!doctor) return res.status(404).json({ message: "Doctor not found!" })

    const updatedDoctor = await Doctor.findById(req.params.id)
    res.json(updatedDoctor)
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

//@desc Delete Doctor
//@route DELETE /api/doctors/:id
//@access private
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id)
    if (!doctor) return res.status(404).json({ message: "Doctor not found" })
    res.json({ message: "Doctor deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

module.exports = {
  getDoctor,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
}
