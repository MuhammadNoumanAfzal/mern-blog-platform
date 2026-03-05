import mongoose from "mongoose";

import categoryModel from "../models/Category.js";
import newsModel from "../models/News.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comments.js";

const index = async (req, res) => {
  const news= await newsModel.find().populate("category", {categoryName:1, "slug":1,}).populate("author", "fullName").sort({ createdAt: -1 })

  const categoriesInUse = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: categoriesInUse } });
  // res.json(news)
  
  res.render("index", {news, categories} );
};
const articleByCategories = async (req, res) => {
  const category=await categoryModel.findOne({slug: req.params.name})
  if(!category){
    return res.status(404).send("Category not found")
  }


  const news= await newsModel.find({ category: category._id }).populate("category", {categoryName:1, "slug":1,}).populate("author", "fullName").so rt({ createdAt: -1 })

  const categoriesInUse = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: categoriesInUse } });
  // res.json(news)
  
  res.render("category", {news, categories} );
};

 
const singleArticle = async (req, res) => {
  const singleNews= await newsModel.findById(req.params.id).populate("category", {categoryName:1, "slug":1,}).populate("author", "fullName").sort({ createdAt: -1 })

  const categoriesInUse = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: categoriesInUse } });
  // res.json(news)
  
  res.render("single", {singleNews, categories} );
};

 
const search = async (req, res) => {
  const news= await newsModel.find().populate("category", {categoryName:1, "slug":1,}).populate("author", "fullName").sort({ createdAt: -1 })

  const categoriesInUse = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: categoriesInUse } });
  // res.json(news)
  
  res.render("search", {news, categories} );
};

  
const author = async (req, res) => {
  const news= await newsModel.find({author: req.params.id}).populate("category", {categoryName:1, "slug":1,}).populate("author", "fullName").sort({ createdAt: -1 })

  const categoriesInUse = await newsModel.distinct("category");
  const categories = await categoryModel.find({ _id: { $in: categoriesInUse } });
  // res.json(news)
  
  res.render("author", {news, categories} );
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
