import userModel from "../models/User.js";

const loginPage = async (req, res) => {
  res.render("admin/login");
};
const adminLogin = async (req, res) => {};
const logout = async (req, res) => {};

const dashboard = async (req, res) => {
  res.render("admin/dashboard");
};

const allUser = async (req, res) => {
  const users = await userModel.find();
  res.render("admin/users/index",{users});
};
const addUserPage = async (req, res) => {
  res.render("admin/users/create");
};
const addUser = async (req, res) => {
  await userModel.create(req.body);
  res.redirect("/admin/users");
};
const updateUserPage = async (req, res) => {
  res.render("admin/users/update");
};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

export {
  loginPage,
  adminLogin,
  logout,
  dashboard,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
};
