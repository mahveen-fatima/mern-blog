import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

   
    const isAuthor = post && userData ? post.userId === userData._id : false;

    useEffect(() => {
        console.log("Slug from URL:", slug);
        if (slug) {
            console.log("Fetching data for slug:", slug);

            axios
                .get(`/api/v1/post/${slug}`)
                .then((response) => {
                    console.log("Post data fetched:", response.data);
                        setPost(response.data); 
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/");
                });
        } else {
            console.log("No slug, navigating home..."); 
            navigate("/"); 
        }
    }, [slug, navigate]);

    console.log("post state:", post);
    

    console.log("userData from Redux:", userData);

    console.log("isAuthor:", isAuthor);

    const deletePost = () => {
        if (!post) return;

        axios
            .delete(`/api/v1/post/${slug}`)
            .then(() => {
                if (post.featuredImage) {
                    axios.delete(`/${post.featuredImage}`);
                }
                navigate("/");
            })
            .catch((err) => console.error("Failed to delete post", err));
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2 mx-auto">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="rounded-xl w-[700px] h-[400px]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold mx-[285px]">{post.title}</h1>
                </div>
                <div className="browser-css mx-[285px]">
                    {post.content ? parse(post.content) : <p>No content available</p>}
                </div>
            </Container>
        </div>
    ) : <div>Loading...</div>
}
