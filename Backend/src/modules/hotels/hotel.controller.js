export const createHotel = async (req, res) => {
  res.json({
    success: true,
    message: "Hotel created successfully"
  });
};

export const getHotels = async (req, res) => {
  res.json({
    success: true,
    message: "Hotels fetched"
  });
};

export const updateHotel = async (req, res) => {
  res.json({
    success: true,
    message: "Hotel updated"
  });
};

export const deleteHotel = async (req, res) => {
  res.json({
    success: true,
    message: "Hotel deleted"
  });
};