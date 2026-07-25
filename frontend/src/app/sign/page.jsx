"use client"

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {
    const router = useRouter()
    const [form, setform] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [show, setshow] = useState(false)
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                alert("signin scuesfully")
                router.push("/login")
                setform({
                    username: "",
                    email: "",
                    password: ""
                })
            }

        } catch (error) {
            alert("somthing went wrong", error.message)

        }
        
    }
    const handleShow=()=>{
            setshow(!show)
        }
    return (
        <div className='flex flex-col  md:flex-row '>
            <div className="flex flex-col m-5  ">
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl md:text-3xl text-center '>Welcome </h2>
                    <div>
                        <p className=' max-w-sm text-center mx-auto bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Sign-In to start your personal journey!</p>
                        <p className=' max-w-sm text-center mx-auto bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'> and keep your memory safe</p>
                    </div>
                </div>
                <Image src='/diary.png' alt='diary image' width={500} height={500} priority className='w-auto h-auto'></Image>
            </div>
            <div className="m-5 bg-zinc-100 md:w-1/2 rounded-md px-2 py-3">
                <h1 className='text-center text-2xl font-bold'>Sign In</h1>
                <p className='text-zinc-500 text-center'>Welcome! please enter your detail to create your account</p>
                <div className="form m-5">
                    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">

                            <label htmlFor="username">UserName*</label>
                            <input type="text" name='username' id='username' value={form.username} required placeholder='Create Your  Username' className='outline-none  p-2 bg-zinc-300 rounded-md' onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">

                            <label htmlFor="email">Email*</label>
                            <input type="email" name='email' id='email' value={form.email} required placeholder='Enter Your Email' className='outline-none  p-2 bg-zinc-300 rounded-md' onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password*</label>
                            <div className="relative w-full">
                                <input type={show ? "password" : "text"} name='password' id='password' value={form.password} required placeholder='Enter Your Password' className='outline-none w-full p-2 bg-zinc-300 rounded-md' onChange={handleChange} />
                                <button onClick={handleShow} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-800 transition-colors'>{show ? <FaEyeSlash /> : <FaEye />}</button>
                            </div>
                        </div>
                        <input type="submit" value="Create Account" className='text-white bg-linear-to-r from-purple-600 to-purple-800  p-2  rounded-md   hover:bg-blue-800 active:scale-90 transition-transform duration-150' />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Page
