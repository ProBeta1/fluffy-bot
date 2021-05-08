const mongoose = require("mongoose");
const oxygenCan = mongoose.model("oxygenCan");

module.exports = (app) => {
  app.get(`/api/oxygenCan`, async (req, res) => {
    const cans = await oxygenCan.find();
    return res.status(200).send(cans);
  });

  app.post(`/api/oxygenCan`, async (req, res) => {
    let cans = await oxygenCan.create(req.body);
    return res.status(201).send({
      error: false,
      cans,
    });
  });
};
