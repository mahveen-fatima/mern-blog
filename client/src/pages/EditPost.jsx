import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async() => {
            if(slug) {
                try {
                    const response = await axios.get(`/api/v1/post/${slug}`)
                    if(response.status === 200) {
                        setPost(response.data.data)
                    } 
                } catch (error) {
                    console.error("Error fetching post: ", error);
                    navigate("/")
                }
            } else {
                navigate("/feed")
            }
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost