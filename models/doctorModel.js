const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(value)
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    fees: {
      type: String,
      trim: true,
    },
    availability: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Doctor", doctorSchema)
