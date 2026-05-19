import Markup from "./markup.model.js";

export const createMarkup = async (req, res) => {
  try {
    const markup = await Markup.create(req.body);
    res.status(201).json({ success: true, data: markup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllMarkups = async (req, res) => {
  try {
    const markups = await Markup.find().sort({ createdAt: -1 });
    res.json({ success: true, data: markups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateMarkup = async (req, res) => {
  try {
    const markup = await Markup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: markup });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMarkup = async (req, res) => {
  try {
    await Markup.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};