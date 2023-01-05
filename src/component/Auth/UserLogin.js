import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import './AdminLogin.css'
function UserLogin() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (userData) => {
        try {
            const { data } = await axios.post("http://localhost:6969/login", userData, { withCredentials: true })
            console.log(data);
            if (data.status == true) {
                navigate('/')
            } else {
                toast.error(data.message, { position: "top-center" })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='App'>
            <div className='register'>
                <div className='col-1'>
                    <h2> Login </h2>
                    <form
                        id='form'
                        className='flex flex-col'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input type="text" placeholder='email'  {...register("email", {
                            required: { value: true, message: "Email is required" },
                            pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email" }
                        })} />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <input type="text" placeholder='password' {...register("password", { required: { value: true, message: "Password required" }, minLength: { value: 4, message: "Password should be 4 characters long" } })} />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <button className='btn'> Submit </button>
                        <p style={{ opacity: '.6' }}><a href='/register'>Register</a></p>
                    </form>
                </div>
                {/* <div className='col-2'>
                  <img src={bgImg} alt='Failed to load the image' />
              </div> */}
            </div>
        </section>

    )
}
export default UserLogin