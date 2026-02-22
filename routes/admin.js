import express from "express";
const router = express.Router();

import {
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

// ✅ LOGIN ROUTES
router.get("/login", loginPage); // /admin/login
router.post("/login", adminLogin); // /admin/login
router.get("/logout", logout); // /admin/logout
router.get("/dashboard", isLoggedIn, dashboard); // /admin/dashboard

// Article CRUD Routes
router.get("/article", isLoggedIn, allarticle);
router.get("/add-article", isLoggedIn, addArticlePage);
router.post("/add-article", isLoggedIn, addArticle);
router.get("/update-article/:id", isLoggedIn, updateArticlePage);
router.post("/update-article/:id", isLoggedIn, updateArticle);
router.get("/delete-article/:id", isLoggedIn, deleteArticle);

// User CRUD Routes
router.get("/users", isLoggedIn, allUser);
router.get("/add-user", isLoggedIn, addUserPage);
router.post("/add-user", isLoggedIn, addUser);
router.get("/update-user/:id", isLoggedIn, updateUserPage);
router.post("/update-user/:id", isLoggedIn, updateUser);
router.delete("/delete-user/:id", isLoggedIn, deleteUser);

// Category CRUD Routes
router.get("/category", isLoggedIn, allCategory);
router.get("/add-category", isLoggedIn, addCategoryPage);
router.post("/add-category", isLoggedIn, addCategory);
router.get("/update-category/:id", isLoggedIn, updateCategoryPage);
router.post("/update-category/:id", isLoggedIn, updateCategory);
router.get("/delete-category/:id", isLoggedIn, deleteCategory);

// Comments
router.get("/comments", isLoggedIn, allComments);

export default router;
