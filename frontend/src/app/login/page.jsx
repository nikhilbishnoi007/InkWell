"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState,useEffect } from 'react'


const Page = () => {
    const [form, setform] = useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(form)
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
                <form className='flex flex-col gap-4 'onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">

                    <label htmlFor="email">Email*</label>
                    <input type="email" name='email' id='email' value={form.email} required placeholder='Enter Your Email' className='outline-none  p-2 bg-zinc-300 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password*</label>
                    <input type="password" name='password' id='password'value={form.password} required placeholder='Enter Your Password' className='outline-none  p-2 bg-zinc-300 rounded-md' onChange={handleChange}/>
                    </div>
                    <input type="submit" value="Login"  className='text-white bg-linear-to-r from-purple-600 to-purple-800  p-2 rounded-md   hover:bg-blue-800 active:scale-90 transition-transform duration-150'/>
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
