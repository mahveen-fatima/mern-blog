import React from "react";
import { Link } from "react-router-dom";

function PostCard({ slug, title, description, featuredImage }) {


    

    // const { slug, title, description, featuredImage } = post;
    return (
        <Link
            to={`/post/${slug}`}
            className="block hover:scale-105 transform transition duration-300"
        >
          
            <div className="w-full bg-gray-900 text-white rounded-xl p-4 shadow-lg">
                {/* Featured image */}
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={featuredImage}
                        alt={title}
                        className="rounded-lg w-full object-cover h-36"
                    />
                    
                </div>
                
                {/* Title */}
                <h2 className="text-lg font-bold">{title}</h2>
                {/* Description */}
                <p className="text-sm text-gray-300 mt-2">
                    {description && description.length > 100
                        ? `${description.slice(0, 100)}...`
                        : description}
                </p>
            </div>
        </Link>
    );
}

export default PostCard;
