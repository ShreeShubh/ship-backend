const Patient = require("../models/patientModel")

//@desc Create Patient
//@route POST /api/patients
//@access private
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body)
    res.status(201).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Read all Patients
//@route GET /api/patients
//@access private
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
    res.status(200).json(patients)
  } catch (error) {
    res.status(500).json({ mesage: error.mesage })
  }
}

//@desc Read Patient by ID
//@route GET /api/patients/:id
//@access private
const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient) return res.status(404).json({ message: "Patient not found" })
    res.json(patient)
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

//@desc Update Patient
//@route PUT /api/patients/:id
//@access private
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body)
    if (!patient) return res.status(404).json({ message: "Patient not found!" })

    const updatedPatient = await Patient.findById(req.params.id)
    res.json(updatePatient)
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

//@desc Delete Patient
//@route DELETE /api/patients/:id
//@access private
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id)
    if (!patient) return res.status(404).json({ message: "Patient not found" })
    res.json({ message: "Patient deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.mesage })
  }
}

module.exports = {
  getPatient,
  getPatients,
  createPatient,
  deletePatient,
  updatePatient,
}
