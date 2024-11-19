const mongoose = require("mongoose")

const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
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
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to the Doctor model
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Hospital", hospitalSchema)
