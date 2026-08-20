import Theme from "./theme.model.js";

export const updateThemeService = async (data) => {
  return await Theme.findOneAndUpdate(
    {},
    data,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
};

export const getThemeService = async () => {
  return await Theme.findOne({ isActive: true });
};

export const deleteThemeService = async () => {
  return await Theme.deleteMany({});
};