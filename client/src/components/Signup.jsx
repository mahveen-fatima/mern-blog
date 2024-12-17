import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ error, setError ] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("");
        console.log("Sending data: ", data); 
        try {
            const response = await axios.post("/api/v1/users/register", data);
    
            if (response.status === 201) {
                dispatch(login(response.data.user));
                navigate("/feed");  // Redirection logic
                console.log(navigate);
                
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong while signing up");
            console.log("error", error);
            
        }
    };
    



  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-bgColor rounded-xl p-10 border border-gray-600 text-textColor`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base text-textColor'>Already have an account?&nbsp;
            <Link
            to="/login"
            className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                        label="Username: "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: true
                        })}
                    />

                    <Input 
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => 
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input 
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                    />

                    <Button type="submit" className="w-full bg-btnColor text-textColor">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup