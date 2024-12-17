import { Post } from "../models/post.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"
import { v2 as cloudinary} from "cloudinary"

// CREATE POST
const createPost = asyncHandler( async(req, res) => {
    const { title, slug, content, status, userId } = req.body

    if([title, slug, content, status, userId].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.")
    }

    const existingPost = await Post.findOne({slug})
    if(existingPost) {
        throw new ApiError(400, "Post with the same slug already exists")
    }

    const featuredImageLocalPath = req.file?.path;

    if(!featuredImageLocalPath) {
        throw new ApiError(400, "Featured file is required")
    }

    const featuredImage = await uploadOnCloudinary(featuredImageLocalPath)

    if(!featuredImage) {
        throw new ApiError(400, "Featureddddd file is required.")
    }

    const post = await Post.create({
        title,
        slug,
        content,
        featuredImage: featuredImage.url,
        status,
        userId
    })

    if(!post) {
        throw new ApiError(500, "Failed to create post.")
    }

    res.status(201).json( new ApiResponse(201, post, "Post created successfully."))
})


// UPDATE POST

// const updatePost = asyncHandler(async (req, res) => {
//     const { slug } = req.params;
//     const { title, content, status } = req.body;
//     // let featuredImage = req.body.featuredImage || null;

//     const post = await Post.findOne({ slug });

//     if (!post) {
//         throw new ApiError(404, "Post not found");
//     }

//     // Check if a new image is uploaded
//     // if (req.files && req.files.featuredImage) {
//     //     // Delete the old image if it's a new one
//     //     if (post.featuredImage) {
//     //         await axios.delete(`/api/delete-file/${post.featuredImage}`);
//     //     }

//     //     // Set the new image
//     //     featuredImage = req.file?.path;
//     // }

//     // if (req.file) {
//     //     // Delete the old image if it's a new one
//     //     if (post.featuredImage) {
//     //         try {
//     //             await axios.delete(`/api/delete-file/${post.featuredImage}`);
//     //         } catch (error) {
//     //             console.error("Failed to delete old image:", error.message);
//     //             // Optionally, decide if this should throw an error or continue
//     //         }
//     //     }

//     //     // Set the new image
//     //     featuredImage = req.file.path;
//     // }

//     // if (req.file) {
//     //     // Delete the old image file if it exists
//     //     if (post.featuredImage) {
//     //         try {
//     //             await fs.unlink(post.featuredImage);
//     //             console.log("Old image deleted successfully");
//     //         } catch (error) {
//     //             console.error("Failed to delete old image:", error.message);
//     //         }
//     //     }

//     //     // Set the new image
//     //     featuredImage = req.file.path;
//     // }

//     let featuredImage = post.featuredImage

//     if(req.file) {
//         if(post.featuredImage) {
//             try {
//                 const publicId = post.featuredImage.split('/').pop().split(".")[0]
//                 await cloudinary.uploader.destroy(publicId)
//                 console.log("Old image deleted successfully");
                
//             } catch (error) {
//                 console.error("Failed to delete old image: ", error.message);         
//             }
//         }

//         const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
//             resource_type: "auto",
//         })

//         featuredImage = uploadResponse.source_url

//         fs.unlinkSync(req.file.path)
//     }

//     post.title = title;
//     post.content = content;
//     post.status = status;
//     post.featuredImage = featuredImage;  // Update the featured image

//     await post.save();
//     res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
// });

const updatePost = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { title, content, status } = req.body;

    const post = await Post.findOne({ slug });

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    let featuredImage = post.featuredImage; // Default to the existing image

    // Check if a new image is uploaded
    if (req.file) {
        // Delete the old image from Cloudinary
        if (post.featuredImage) {
            try {
                const publicId = post.featuredImage.split('/').pop().split('.')[0]; // Extract publicId from URL
                await cloudinary.uploader.destroy(publicId);
                console.log("Old image deleted successfully");
            } catch (error) {
                console.error("Failed to delete old image:", error.message);
            }
        }

        // Upload the new image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto",
        });

        featuredImage = uploadResponse.secure_url; // Set the new image URL
        fs.unlinkSync(req.file.path); // Remove local file
    }

    // Ensure featuredImage is not empty
    if (!featuredImage) {
        throw new ApiError(400, "Featured image is required");
    }

    // Update the post
    post.title = title;
    post.content = content;
    post.status = status;
    post.featuredImage = featuredImage;

    await post.save();
    res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});



const deletePost = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Delete the associated file (if it exists) directly in the delete post route
    if (post.featuredImage) {
        await cloudinary.uploader.destroy(post.featuredImage);
    }

    console.log(`Fetching post with slug: ${slug}`);  // Log the incoming slug

    res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
});




// GET A SINGLE POST
const getPost = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    try {
        const post = await Post.findOne({slug});
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

  


// GET ALL POSTS
const getPosts = asyncHandler( async(req, res) => {
    const { status } = req.query
    const query = status ? { status} : {}

    const posts = await Post.find(query)
    if(!posts.length) {
        throw new ApiError(404, "No posts found.")
    }

    


    res.status(200).json( new ApiResponse(200, posts, "Posts retrieved successfully."))
})


export {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts
}