import userModel from "../models/User.js";

const loginPage = async (req, res) => {
  res.render("admin/login");
};
const adminLogin = async (req, res) => {};
const logout = async (req, res) => {};

const allUser = async (req, res) => {
  res.render("admin/users/index");
};
const addUserPage = async (req, res) => {
  res.render("admin/users/create");
};
const addUser = async (req, res) => {};
const updateUserPage = async (req, res) => {
  res.render("admin/users/update");
};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

export {
  loginPage,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
};
