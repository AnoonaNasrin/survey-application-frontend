import React, { useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {  toast } from 'react-toastify';

import "./Usersign.css";

function UserSign() {
    const [cookies, setCookies] = useCookies([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.jwt) {
            navigate('/')
        }
    }, [cookies, navigate])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "")
    const onSubmit = async (userData) => {
        console.log(userData);
        try {
            const { data } = await axios.post("http://localhost:6969/register", userData, { withCredentials: true })
            if (data.status == false) {
                toast.error(data.message, { position: "top-center" })
            } else {
                navigate('/')
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='App'>
            <div className='register'>
                <div className='col-1'>
                    <h2>Sign up</h2>
                    <form
                        id='form'
                        className='flex flex-col'
                        onSubmit={handleSubmit(onSubmit)}

                    >
                        <input type="text" placeholder='name' {...register("name", { required: { value: true, message: "Name  is required" }, minLength: { value: 5, message: "name must contain 5 letters" } })} />

                        {errors.name && <p className='error'>{errors.name.message}</p>}

                        <input type="text" placeholder='email' {...register("email", {
                            required: { value: true, message: "Email is required " },
                            pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "enter a valid email" }
                        })} />

                        {errors.email && <p className='error'>{errors.email.message}</p>}

                        <input type="password" placeholder='password'
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 4, message: "Password should have 4 characters", },
                            })} />

                        {errors.password && <p className='error'>{errors.password.message}</p>}

                        <input type="text" placeholder='confirm password' {...register("confirm", {
                            required: "password is required",
                            validate: (value) =>
                                value === password.current || "Password do not match"
                        })} />

                        {errors.confirm && <p className='error'>{errors.confirm.message}</p>}

                        <button className='btn'> Sign Up </button>

                    </form>

                </div>

             
            </div>

        </section>

    )
}

export default UserSign

