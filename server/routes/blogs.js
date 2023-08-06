import express from "express";
import { getFeedBlogs , getUserBlogs , likeBlog } from "../controllers/blogs.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",verifyToken,getFeedBlogs);

router.get("/:userId/blogs",verifyToken,getUserBlogs);

router.patch("/:blogId/like",verifyToken,likeBlog);

export default router;