const mongoose = require("mongoose");
const { Schema } = mongoose;

const oxygenCan = new Schema({
  state: String,
  city: String,
  contact: String,
});

mongoose.model("oxygenCan", oxygenCan);
