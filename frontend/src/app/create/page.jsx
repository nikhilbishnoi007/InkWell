"use client"
import React from 'react'
import Link from 'next/link'
import { useState ,useEffect} from 'react'


const Page = () => {
    const [form, setform] = useState({
        title: "",
        content: "",

    })
    const [notes, setnotes] = useState([])
    const hadnleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
             const data = await res.json();
             if(data.success){
            alert("data save ")
            setnotes((prevNotes) => [...prevNotes, data.data]); 
             }
        } catch (error){
            console.log(error.message)
        }
        setform({
            title: "",
            content: ""
        })
    }
    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getnotes`);
                const data =await  response.json();
                setnotes(data.data)
            }catch (error) {
            console.log(error.message)
        } 

        }
        getdata()

    }, [])

    return (
        <>
            <div className='main text-white w-full p-5 flex flex-col gap-3'>
                <div className="input">
                    <h1>Create Task</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-2xl '>
                        <input type="text" name="title" value={form.title} placeholder='title' onChange={hadnleChange} className='px-2 py-5 bg-zinc-800 outline-none border border-none rounded-md' />
                        <textarea name="content" id="content" value={form.content} placeholder='Write Your Notes' onChange={hadnleChange} className='px-2 py-5 bg-zinc-800 resize-none outline-none border border-none rounded-md'></textarea>
                        <input type="submit" value='Save Notes' className='bg-blue-600 px-2 py-4 rounded-md   hover:bg-blue-800 active:scale-90 transition-transform duration-150' />
                    </form>
                </div>
                <div className='output'>
                    {notes.length===0?(<p>No Notes Created Yet</p>) :
                        (
                            <div className='p-5 flex flex-col'>
                                <h1 className=' m-4'>Save Notes</h1>
                                {
                                    notes.map((note) => {
                                        return <div key={note._id} className='flex flex-col gap-4 bg-zinc-800  mb-2 mt-2  px-2 py-3  rounded-md max-w-2xl'>
                                            <h2 className='text-center'>Title:{note.title}</h2>
                                            <Link href={`/create/${note._id}`} className='text-blue-600'>Read Note</Link>
                                        </div>
                                    })
                                }

                            </div>
                        )


                    }

                </div>
            </div>
        </>
    )
}

export default Page
