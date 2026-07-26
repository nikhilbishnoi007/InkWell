"use client"
import React from 'react'
import Link from 'next/link'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const Page = () => {
    const {isloggedin}=useAuth()
    const router=useRouter()
    useEffect(() => {
     if(!isloggedin){
        router.push("/login")
     }
    }, [isloggedin,router])
    

    const [form, setform] = useState({
        title: "",
        content: "",

    })
    const [notes, setnotes] = useState([])
    const [editid, seteditid] = useState(null)
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
            if (data.success) {
                alert("data save ")
                setnotes((prevNotes) => [...prevNotes, data.data]);
            }
        } catch (error) {
            console.log(error.message)
        }
        setform({
            title: "",
            content: ""
        })
        seteditid(null)
    }
    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getnotes`);
                const data = await response.json();
                setnotes(data.data)
            } catch (error) {
                console.log(error.message)
            }

        }
        getdata()

    }, [])

    const handleDelete = async (id) => {
        const result=confirm("do yo want to delelte the diary!")
        if(result){
        try {
            const deleteNotes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
                method: "DELETE"
            })
            const data = await deleteNotes.json()
            if (data.success) {
                setnotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    else{
        return null
    }


    }
    const handleEdit = async (note) => {
        setform({
            title: note.title,
            content: note.content
        })
        setnotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${note._id}`, {
            method: "DELETE",
        })
        seteditid(note._id)
    }
  if (!isloggedin) return null
    return (
        <>
            <div className='main text-black w-full p-5 flex flex-col gap-3'>
                <div className="input">
                    <h1>Create Task</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-2xl '>
                        <input type="text" name="title" value={form.title} placeholder='title' onChange={hadnleChange} className='px-2 py-5 bg-zinc-100 outline-none border border-none rounded-md' required/>
                        <textarea name="content" id="content" value={form.content} placeholder='Write Your Notes' onChange={hadnleChange} className='px-2 py-5 bg-zinc-100 resize-none outline-none border border-none rounded-md' required></textarea>
                        <input type="submit" value={editid ? "Upadate Notes" : "Save Notes"} className='text-white bg-linear-to-l from-purple-600 to-purple-800  px-2 py-4 rounded-md   hover:bg-blue-800 active:scale-90 transition-transform duration-150' />
                    </form>
                </div>
                <div className='output'>
                    {notes.length === 0 ? (<p>No Notes Created Yet</p>) :
                        (
                            <>
                                <h1 className=' m-4'>Your Notes</h1>
                                <div className='p-2 grid  grid-cols-2 md:grid-cols-3 gap-4'>
                                    {
                                        notes.map((note) => {
                                            return <div key={note._id} className='flex flex-col gap-4 bg-zinc-300 text-black  mb-2 mt-2  px-2 py-3  rounded-md max-w-2xl'>
                                                <h2 className='text-center'>Title:{note.title}</h2>
                                                <div className='flex justify-between '>
                                                    <Link href={editid ? "/create" : `/create/${note._id}`} className={editid ? 'text-zinc-600' : 'bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'}>Read Note</Link>
                                                    <div className="flex gap-2 md:gap-4">
                                                        <button className={editid ? " text-zinc-600" : "cursor-pointer hover:active:scale-90 transition-transform duration-150"} onClick={() => { handleEdit(note) }} disabled={editid && editid !== note.id}><CiEdit /></button>
                                                        <button className={editid ? 'text-zinc-600' : 'cursor-pointer   hover:active:scale-90 transition-transform duration-150 '} onClick={() => { handleDelete(note._id) }} disabled={editid && editid !== note.id}><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                            </>
                        )


                    }

                </div>
            </div>
        </>
    )
}

export default Page
