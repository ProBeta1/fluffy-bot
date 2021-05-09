const mongoose = require("mongoose");
const { Schema } = mongoose;

const oxygenDB = new Schema({
  state: String,
  city: String,
  contact: String,
  name: String,
  addedAt: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("oxygenDB", oxygenDB);
