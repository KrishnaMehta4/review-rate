const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    foundedOn: {
      type: Date,
    },

    description: {
      type: String,
    },

    logo: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Company",
  companySchema
);