import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import axios from "axios";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/api/v1/post/all-posts");
                if (response.status === 200) {
                    setPosts(response.data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching posts: ", error);
                setError("Failed to load posts. Please try again later.");
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <p className="text-gray-500">Loading posts...</p>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <p className="text-red-500">{error}</p>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {posts?.map((post) => (
                        <PostCard key={post._id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
