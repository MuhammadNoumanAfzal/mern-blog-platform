import mongoose from "mongoose";

import categoryModel from "../models/Category.js";
import newsModel from "../models/News.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comments.js";

const index = async (req, res) => {
  res.render("index");
};
const articleByCategories = async (req, res) => {
  res.render("category");
};
const singleArticle = async (req, res) => {
  res.render("single");
};
const search = async (req, res) => {
  res.render("search");
};
const author = async (req, res) => {
  res.render("author");
};
const addComment = async (req, res) => {};

export {
  index,
  articleByCategories,
  singleArticle,
  search,
  author,
  addComment,
};
