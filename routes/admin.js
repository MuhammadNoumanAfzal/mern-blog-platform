import express from "express";
const router = express.Router();

import { loginPage, adminLogin, logout } from "../controller/userController.js";

import {
  allarticle,
  addArticlePage,
  addArticle,
  updateArticlePage,
  updateArticle,
  deleteArticle,
} from "../controller/articleController.js";

import {
  dashboard,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import {
  allCategory,
  addCategoryPage,
  addCategory,
  updateCategoryPage,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController.js";

import { allComments } from "../controller/commentsController.js";

//LOGIN ROUTES
router.get("/", loginPage);
router.post("/index", adminLogin);
router.post("/logout", logout);
router.get("/dashboard", dashboard);

// Article CRUD Routes
router.get("/article", allarticle);
router.get("/add-article", addArticlePage);
router.post("/add-article", addArticle);
router.get("/update-article/:id", updateArticlePage);
router.post("/update-article/:id", updateArticle);
router.get("/delete-article/:id", deleteArticle);

// User CRUD Routes
router.get("/users", allUser);
router.get("/add-user", addUserPage);
router.post("/add-user", addUser);
router.get("/update-user/:id", updateUserPage);
router.post("/update-user/:id", updateUser);
router.get("/delete-user/:id", deleteUser);

// Category CRUD Routes
router.get("/category", allCategory);
router.get("/add-category", addCategoryPage);
router.post("/add-category", addCategory);
router.get("/update-category/:id", updateCategoryPage);
router.post("/update-category/:id", updateCategory);
router.get("/delete-category/:id", deleteCategory);

//COMMENTS ROUTES
router.get("/comments", allComments);

export default router;
