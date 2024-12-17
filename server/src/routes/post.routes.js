import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/all-posts").get(getPosts)
router.route("/:slug").get(getPost)

// secured routes 
router.route("/create").post(
    upload.single('featuredImage'),
    createPost)
router.route("/update/:slug").put(
    upload.single('featuredImage'),
    updatePost)
router.route("/delete/:slug").delete( deletePost)

export default router