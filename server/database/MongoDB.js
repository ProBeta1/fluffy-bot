const Discord = require("discord.js");
const oxygenDB = require("./Schematics/oxygenCan.js");

module.exports.getCityOxygen = async function (city) {
  let cityOxygen = await oxygenDB.find({ city });
  console.log("cityOxygen: ", cityOxygen);
  cityOxygen.sort();
  return cityOxygen;
};

module.exports.getStateOxygen = async function (state) {
  let stateOxygen = await oxygenDB.find({ state });
  stateOxygen.sort();
  return stateOxygen;
};

module.exports.postOxygen = async function (state, city, contact, name) {
  let p = await oxygenDB.findOne({ state, city, contact, name });
  if (p) {
    console.log("found you");
    return p;
  } else {
    p = new oxygenDB({
      state,
      city,
      contact,
      name,
    });
    await p.save().catch((err) => console.log(err));
    return p;
  }
};
