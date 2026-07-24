import React from 'react'
import Link from 'next/link'
import { TfiWrite } from "react-icons/tfi";
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='w-full flex justify-between border-b border-gray-200 p-4'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/logo.png' alt='logo image' width={16} height={16}></Image>
             <h2 > Inkwell</h2>
        </div>
     
      <ul className='flex gap-4'>
        <li><Link href='/'>Home </Link></li>
        <li><Link href='/create'>Create</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
