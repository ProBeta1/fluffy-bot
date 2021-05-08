import axios from "axios";

export default {
  addOxygenCan: async (tmp) => {
    let res = await axios.post("/api/oxygenCan", tmp);
    return res.data || [];
  },
};
