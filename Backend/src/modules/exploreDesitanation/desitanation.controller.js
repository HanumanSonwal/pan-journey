import { getHomeDestinations } from "./desitanation.service.js";

export const getHomeDestinationsController = async (req, res) => {
  try {
    const { type } = req.query;

    const data = await getHomeDestinations(type);

    res.json({
      success: true,
      type,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};