"use client"
import React from 'react'
import Link from 'next/link'
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useUI } from '@/app/context/UIContext';
const Navbar = () => {
  const router = useRouter()
  const path=usePathname()
  const { isloggedin, setisloggedin } = useAuth()
  const { showToast ,showConfirm} = useUI();
  const handlelogout = async () => {
    const result = await showConfirm("do yo want to logout")
    if (!result) return; 
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      })
      const reqdata = await req.json()
      if (reqdata.success) {
        
          
          setisloggedin(false)
          router.push("/")
      }
    } catch (error) {
      showToast(error.message)
     
    }
  }
  const handleClick = (e) => {
    if (!isloggedin) {
      e.preventDefault();
      showToast("Please login to create a note");
      router.push("/login");
    }
    else {
      router.push("/create")
    }
  }
  return (
    <div className='w-full flex justify-between items-center border-b border-zinc-400 p-2 md:p-4  '>
       <Link href="/">
       
      <div className='flex items-center gap-2 cursor-pointer'>
        <Image src='/diary.png' alt='logo image' width={24} height={24} priority className='w-auto h-auto'></Image>
        <h2 className='text-2xl'> Inkwell</h2>
      </div>
        </Link>

      <ul className='flex gap-2  items-center '>
        

        {isloggedin ? (
          <>
            <li className={path==="/create"? 'pb-1 border-b-2 border-purple-600 transition-all duration-300 ':''}><Link href='/create' onClick={handleClick}>Create</Link></li>
            <button onClick={handlelogout} className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-2 rounded-md flex items-center gap-2 justify-center hover:active:scale-90 transition-transform duration-150 ">
            Logout<IoIosLogOut /></button>
          </>
        ) : (
          <>

            <li><Link href='/login' className="text-white bg-linear-to-l from-purple-600 to-purple-800  p-2 rounded-md flex items-center gap-2 justify-center hover:active:scale-90 transition-transform duration-150 ">Login <MdOutlineLogin /></Link></li>
            
          </>

        )}
      </ul>
    </div>
  )
}

export default Navbar
