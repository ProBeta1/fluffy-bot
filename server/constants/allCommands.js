module.exports = {
  commands: [
    {
      name: "addOxy <state> <city> <contact> <name>",
      value: "Add details of oxygen cans",
    },
    {
      name: "getOxyCity <city>",
      value: "Get details of oxygen cans in a specific city",
    },
    {
      name: "getOxyState <state>",
      value: "Get details of oxygen cans in a specific state",
    },
    { name: "help", value: "Show everything I can do" },
  ],
};
