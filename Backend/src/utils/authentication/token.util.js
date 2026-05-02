import jwt from "jsonwebtoken";

export const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id || user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "10s",
    },
  );


export const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user._id || user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
