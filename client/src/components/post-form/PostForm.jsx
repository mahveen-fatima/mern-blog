import React, { useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    const submit = async (data) => {
        console.log("Form submitted with data:", data);
        try {
            if (!userData?._id) {
                console.error("User is not logged in or userId is missing");
                return;
            }
    
            let featuredImage = post?.featuredImage;
            let selectedFile;
    
            if (!data.slug) {
                console.error("Slug is missing");
                return;
            }
    
            if (data.image?.[0]) {
                selectedFile = data.image[0];
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('slug', data.slug);
                formData.append('content', data.content);
                formData.append('status', data.status);
                formData.append('userId', userData._id);
                formData.append('featuredImage', selectedFile);
    
                // For update
                if (post) {
                    const fileUploadResponse = await axios.put(`/api/v1/post/update/${data.slug}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
    
                    console.log("Response from update: ", fileUploadResponse?.data);
                    navigate(`/post/${fileUploadResponse?.data?.slug}`);
                } else {
                    // For new post
                    const fileUploadResponse = await axios.post("/api/v1/post/create", formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
    
                    console.log("Response from create: ", fileUploadResponse?.data);
                    navigate(`/post/${fileUploadResponse?.data?.slug}`);
                }
            } else {
                const postData = {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage,
                    userId: userData._id
                };
    
                if (post) {
                    const updateResponse = await axios.put(`/api/v1/post/update/${slug}`, postData);
                    console.log("Response from update: ", updateResponse?.data); 
                    navigate(`/post/${updateResponse?.data?.slug}`);
                } else {
                    const createResponse = await axios.post("/api/v1/post/create", postData);
                    console.log("Response from create: ", createResponse?.data); 
                    navigate(`/post/${createResponse?.data?.slug}`);
                }
            }

        } catch (error) {
            console.error("Error submitting form: ", error.response ? error.response.data : error);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newSlug = slugTransform(value.title);
                setValue("slug", newSlug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValues={getValues("content")}
                />
            </div>

            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && post.featuredImage && (
                    <div className='w-full mb-4'>
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;