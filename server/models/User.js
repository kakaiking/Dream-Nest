const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: '',      
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firmName: {
      type: String,
      default: '',
    },
    yearStarted: {
      type: Date,
      default: '',
    },
    cmaCertified: {
      type: String,
      default: '',
    },
    assetsUnderManagement: {
      type: Number,
      default: '',
    },
    physicalAddress: {
      type: String,
      default: '',
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
module.exports = User