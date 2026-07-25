import React from 'react'
import Link from 'next/link'
import { TfiWrite } from "react-icons/tfi";
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='w-full flex justify-between border-b border-zinc-400 p-4'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/diary.png' alt='logo image' width={24} height={24} priority className='w-auto h-auto'></Image>
             <h2 > Inkwell</h2>
        </div>
     
      <ul className='flex gap-4'>
        <li><Link href='/'>Home </Link></li>
        <li><Link href='/create'>Create</Link></li>
        <li><Link href='/login' >Login</Link></li>
        <li><Link href='/sign' >SignIn</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
