const Hospital = require("../models/hospitalModel")
const Doctor = require("../models/doctorModel")

//@desc Create Hospitals
//@route POST /api/hospitals
//@access private
const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body)
    res.status(201).json(hospital)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Read all Hospitals
//@route GET /api/hospitals
//@access private
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("doctors")
    res.status(200).json(hospitals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Read Hospital By ID
//@route GET /api/hospitals/:id
//@access private
const getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id)
    res.status(200).json(hospital)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Update Hospital
//@route PUT /api/hospitals/:id
//@access private
const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body)
    if (!hospital)
      return res.status(404).json({ message: "Hospital not found!" })

    const updatedHospital = await Hospital.findById(req.params.id)
    res.json(updatedHospital)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Delete Hospital
//@route DELETE /api/hospitals/:id
//@access private
const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id)
    if (!hospital)
      return res.status(404).json({ message: "Hospital not found!" })

    res.json({ message: "Doctor deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//@desc Assign Doctor to Hospital
//@route POST /api/hospitals/:hospitalId/doctors/:doctorId
//@access private
const assignDoctorToHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId)
    const doctor = await Doctor.findById(req.params.doctorId)

    if (!hospital || !doctor) {
      return res.status(404).json({ message: "Hospital or Doctor not found" })
    }

    if (!hospital.doctors.includes(doctor._id)) {
      hospital.doctors.push(doctor._id)
      await hospital.save()
    }

    res.json(hospital)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createHospital,
  getHospitals,
  getHospital,
  updateHospital,
  deleteHospital,
  assignDoctorToHospital,
}
