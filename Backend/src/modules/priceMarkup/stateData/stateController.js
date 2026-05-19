// import State from "./state.model.js";   // 👈 ye line missing hai

// export const getStatesByCountry = async (req, res) => {
//   try {
//     const states = await State.find({ countryCode: req.params.code })
//       .sort({ stateName: 1 });

//     res.json(states);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to fetch states");
//   }
// };

import State from "./state.model.js";

export const getStatesByCountry = async (req, res) => {
  try {
    const search = req.query.search || "";

    const states = await State.find({
      countryCode: req.params.code,
      stateName: { $regex: search, $options: "i" } // 🔍 search filter
    }).sort({ stateName: 1 });

    res.json(states);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch states");
  }
};