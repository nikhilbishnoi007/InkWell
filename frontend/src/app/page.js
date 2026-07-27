"use client"
import Image from "next/image";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';

export default function Home() {
  const router = useRouter()
  const { isloggedin, setisloggedin } = useAuth()
  const{user}=useAuth()
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
  return (
    <>
      <div className="flex flex-col md:flex-row  justify-between m-5 ">
        <div className="flex flex-col gap-5 m-10">
          <h2 className=" px-2 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Your Thoughts, Your Space</h2>
          <div>
            <h2 className="text-2xl md:text-3xl">Welcome {isloggedin ?user.username:"To"} , </h2>
            <h2 className="text-2xl md:text-3xl"> <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">  Your Personal Diary</span></h2>
            <p className="text-purple-300 mt-5 text-md max-w-md">Write Your thoughts, store your memories,and keep your journey safe: all in one private space</p>
          </div>
        </div>
        <div className="Right">
          <Image src="/diary.png" alt="diary image" width={500} height={500} priority className="w-auto h-auto"></Image>
        </div>

      </div>
      <div className="flex m-5 md:px-10  gap-5">
        {/* <Link href="/create" className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-3 rounded-md flex items-center gap-2  hover:active:scale-90 transition-transform duration-150 ">Start Writting <TfiWrite /></Link> */}
        {isloggedin ? (
          <>
            <Link href="/create" className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-3 rounded-md flex items-center gap-2  hover:active:scale-90 transition-transform duration-150 ">Start Writting <TfiWrite /></Link>

            <button onClick={handlelogout} className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-3 rounded-md flex items-center gap-2  hover:active:scale-90 transition-transform duration-150 ">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-3 rounded-md flex items-center gap-2 justify-center hover:active:scale-90 transition-transform duration-150 ">Login <CiLogin /></Link>
            <Link href="/sign" className="text-zinc-300 bg-linear-to-l from-purple-600 to-purple-800  p-3 rounded-md flex items-center gap-2 justify-center hover:active:scale-90 transition-transform duration-150 ">SignIn<CiLogin /></Link>
          </>

        )
        }
      </div>
    </>
  );
}
