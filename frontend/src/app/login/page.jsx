"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUI } from '../context/UIContext'



const Page = () => {
    const router = useRouter()
    const { showToast } = useUI();
    const {  setisloggedin } = useAuth()
    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const [show, setshow] = useState(false)
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            credentials: "include",
        })
        const data = await res.json()
        if (data.success) {
           showToast("Login successfully"); 
            setisloggedin(true)
            router.push("/")
        }
        else {
            showToast(data.message)
            
        }
    }
    const handleShow = () => {
        setshow(!show)
    }

    return (
        <div className='flex flex-col  md:flex-row '>
            <div className="flex flex-col m-5  ">
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl md:text-3xl text-center '>Welcome <span className='bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent'>Back!</span></h2>
                    <div>
                        <p className=' max-w-sm text-center mx-auto bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Log in to continue your personal journey!</p>
                        <p className=' max-w-sm text-center mx-auto bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'> and keep your memory safe</p>
                    </div>
                </div>
                <Image src='/diary.png' alt='diary image' width={500} height={500} priority className='w-auto h-auto'></Image>
            </div>
            <div className="m-5 bg-zinc-100 md:w-1/2 rounded-md px-2 py-3">
                <h1 className='text-center text-2xl font-bold'>Login</h1>
                <p className='text-zinc-500 text-center'>Welcome Back! please enter your detail</p>
                <div className="form m-5">
                    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
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
                        <input type="submit" value="Login" className='text-white bg-linear-to-r from-purple-600 to-purple-800  p-2 rounded-md   hover:bg-blue-800 active:scale-90 transition-transform duration-150' />
                    </form>
                    <div className='mt-5 flex justify-center gap-1 underline'>
                        <h2 className='text-center'>dont have account?</h2>
                        <Link href='/sign' className='text-blue-400'>SignIn</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
