import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/admin/login"); // for UI pages

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = tokenData;          // ✅ now req.user.role works
    req.role = tokenData.role;     // optional
    req.fullName = tokenData.fullName; // optional

    next();
  } catch (error) {
    return res.redirect("/admin/login");
  }
};

export default isLoggedIn;