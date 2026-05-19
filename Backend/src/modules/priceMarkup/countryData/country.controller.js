// import { seedCountries } from "../countryData/countrySeeder.js";
// import Country from "../countryData/country.model.js";

// export const seedCountryController = async (req, res) => {
//   await seedCountries();
//   res.send("Countries Seeded Successfully");
// };

// export const getCountries = async (req, res) => {
//   const countries = await Country.find().sort({ countryName: 1 });
//   res.json(countries);
// };
import { seedCountries } from "../countryData/countrySeeder.js";
import Country from "../countryData/country.model.js";

export const seedCountryController = async (req, res) => {
  await seedCountries();
  res.send("Countries Seeded Successfully");
};

export const getCountries = async (req, res) => {
  try {
    const search = req.query.search || "";

    const countries = await Country.find({
      countryName: { $regex: search, $options: "i" } // 🔍 filter
    }).sort({ countryName: 1 });

    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch countries");
  }
};