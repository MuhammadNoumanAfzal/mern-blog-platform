import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/admin/login");

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(tokenData._id || tokenData.id);
    if (!user) return res.redirect("/admin/login");

    req.user = user; // ✅ now req.user._id always exists
    req.role = user.role;
    req.fullName = user.fullName;

    next();
  } catch (error) {
    return res.redirect("/admin/login");
  }
};
export default isLoggedIn;
