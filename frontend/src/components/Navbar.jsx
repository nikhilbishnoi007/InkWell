"use client"
import React from 'react'
import Link from 'next/link'
import { TfiWrite } from "react-icons/tfi";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
const Navbar = () => {
  const router = useRouter()
  const { isloggedin, setisloggedin } = useAuth()
  console.log("5. Navbar render, isloggedin =", isloggedin);
  const handlelogout = async () => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      })
      const reqdata = await req.json()
      if (reqdata.success) {
        alert("logout")
        setisloggedin(false)
        router.push("/")
      }
    } catch (error) {
      alert(error.message)
    }
  }
  const handleClick = (e) => {
    if (!isloggedin) {
      e.preventDefault();  
      alert("Please login to create a note");
      router.push("/login");
    }
    else{
      router.push("/create")
    }
  }
  return (
    <div className='w-full flex justify-between border-b border-zinc-400 p-4'>
      <div className='flex items-center gap-2 cursor-pointer'>
        <Image src='/diary.png' alt='logo image' width={24} height={24} priority className='w-auto h-auto'></Image>
        <h2 > Inkwell</h2>
      </div>

      <ul className='flex gap-4'>
        <li><Link href='/'>Home </Link></li>
        <li><Link href='/create' onClick={handleClick}>Create</Link></li>
        {isloggedin ? (
          <button onClick={handlelogout}>Logout</button>
        ) : (
          <>
            <li><Link href='/login' >Login</Link></li>
            <li><Link href='/sign' >SignIn</Link></li>
          </>

        )}
      </ul>
    </div>
  )
}

export default Navbar
