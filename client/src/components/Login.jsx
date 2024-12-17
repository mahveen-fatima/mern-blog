import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useForm } from "react-hook-form"
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [ error, setError ] = useState("")

    // login 
    const login = async(data) => {
        setError("")
        
        try {
            const response = await axios.post("/api/v1/users/login", data, {
                withCredentials: true
            });

            // destructure to get user and tokens from the response

            const { user, accessToken, refreshToken } = response.data.data
            dispatch(authLogin(user))
            

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            navigate("/feed")

        } catch (error) {
            setError(error.response?.data?.message || "An error occured during login.")
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-bgColor text-textColor rounded-xl p-10 border border-gray-600 `}>

            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-textColor'>Don&apos;t have an account?&nbsp;
                <Link 
                to="/signup"
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p> }

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
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
                        Sign in
                    </Button>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Login