const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ClientSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(),
  },
  client_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  client_phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^07\d{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number! It should be 10 digits and start with '07'.`,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  transaction_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v >= new Date(); // Check if the date is not in the past
      },
      message: (props) => `Transaction date cannot be in the past!`,
    },
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
