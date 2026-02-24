const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.redirect("/admin/dashboard");
};

export default isAdmin;
