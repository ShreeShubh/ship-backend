require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 8000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Test API
app.get("/", (req, res) => {
  res.send("Hello Shubham")
})

app.use("/api/doctors", require("./routes/doctorRoutes"))
app.use("/api/hospitals", require("./routes/hospitalRoutes"))
app.use("/api/patients", require("./routes/patientRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!")
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/`)
    })
  })
  .catch((err) => {
    console.log("Connection failed!", err.message)
  })
