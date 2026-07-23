"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
const Page = () => {
    const params = useParams()
    const { read } = params
    const [notes, setnotes] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getnotes/${read}`)
                const data = await res.json()
                setnotes(data.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()

    }, [read])

    return (
        <>  
        <div className="main m-5">
           <div className=' max-w-3xl mx-auto p-10  bg-zinc-800 flex flex-col gap-5 rounded-md'>
           <h1 className='text-center'>Title:{notes.title}</h1>
           <p>{notes.content}</p>
           </div>
        </div>
        </>
    )
}

export default Page
