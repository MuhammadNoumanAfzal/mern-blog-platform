import express from "express";
const router = express.Router();

import {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
} from "../controller/siteController.js";


router.get("/", index);
router.get("/category/:name", articleByCategories);
router.get("/single/:id", singleArticle);
router.get("/search", search);
router.get("/author/:name", author);
router.post("/single/:id", addComment);


export default router;