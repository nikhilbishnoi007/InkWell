import Link from 'next/link'
import Image from 'next/image'
import { IoIosArrowRoundBack } from "react-icons/io";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5 text-center bg-white">
      <Image
        src="/diary.png"
        alt="Page not found"
        width={180}
        height={180}
        className="w-32 h-auto md:w-44 opacity-80"
      />

      <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800">
        Page Not Found
      </h2>

      <p className="text-zinc-500 max-w-sm">
        Looks like this page doesnt exist, or you dont have access to it.
      </p>

      <Link href="/" className="mt-4 text-white bg-linear-to-l from-purple-600 to-purple-800 px-6 py-3 rounded-md flex items-center gap-2 hover:active:scale-90 transition-transform duration-150">
       <IoIosArrowRoundBack /> Back to Home 
      </Link>
    </div>
  );
}