import express from "express";
const router = express.Router();

import {
  loginPage,
  adminLogin,
  logout,
  dashboard,
  setting,
  saveSetting,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import {
  allarticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
} from "../controller/articleController.js";

import {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

import { allComments } from "../controller/commentsController.js";

import isLoggedIn from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";
import multer from "multer";
import upload from "../middleware/multer.js";

// ✅ LOGIN ROUTES
router.get("/login", loginPage); // /admin/login
router.post("/login", adminLogin); // /admin/login
router.get("/logout", logout); // /admin/logout
router.get("/dashboard", isLoggedIn, dashboard); // /admin/dashboard
router.get("/setting", isLoggedIn, isAdmin, setting);
router.post(
  "/save-setting",
  isLoggedIn,
  isAdmin,
  upload.single("website_logo"),
  saveSetting,
);
// Article CRUD Routes
router.get("/article", isLoggedIn, allarticle);
router.get("/add-article", isLoggedIn, addArticlePage);
router.post("/add-article", isLoggedIn, upload.single("newsImage"), addArticle);
router.get("/update-article/:id", isLoggedIn, updateArticlePage);
router.post("/update-article/:id", isLoggedIn, updateArticle);
router.delete("/delete-article/:id", isLoggedIn, deleteArticle);

// User CRUD Routes
router.get("/users", isLoggedIn, isAdmin, allUser);
router.get("/add-user", isLoggedIn, isAdmin, addUserPage);
router.post("/add-user", isLoggedIn, isAdmin, addUser);
router.get("/update-user/:id", isLoggedIn, isAdmin, updateUserPage);
router.post("/update-user/:id", isLoggedIn, isAdmin, updateUser);
router.delete("/delete-user/:id", isLoggedIn, isAdmin, deleteUser);

// Category CRUD Routes
router.get("/category", isLoggedIn, isAdmin, allCategory);
router.get("/add-category", isLoggedIn, isAdmin, addCategoryPage);
router.post("/add-category", isLoggedIn, isAdmin, addCategory);
router.get("/update-category/:id", isLoggedIn, isAdmin, updateCategoryPage);
router.post("/update-category/:id", isLoggedIn, isAdmin, updateCategory);
router.delete("/delete-category/:id", isLoggedIn, isAdmin, deleteCategory);

// Comments
router.get("/comments", isLoggedIn, allComments);

export default router;
