import React, { useState } from 'react'
import Cross from './icons/Cross'

interface Props {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Forgotpassword({ setModalOpen }: Props) {

    const [forgotData, setForgotData] = useState({ email: "", password: "" })

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForgotData({ ...forgotData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/forgotPassword" , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body :JSON.stringify(forgotData)
            })

            
        } catch (error) {
            
        }
    }

    return (
        <div className='relative w-96 h-96 bg-amber-800 justify-center items-center flex flex-col rounded-xl'>
            <button onClick={() => setModalOpen(false)} className='cursor-pointer absolute right-4 top-4 text-white'><Cross /></button>
            <h2 className='text-xl font-semibold'>Forgot Password ?</h2>
            <p>No worries , Set New Password</p>
            <form className='flex justify-center items-center flex-col' onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={forgotData.email}
                    onChange={handlechange}
                    name="email"
                    className='w-60 h-10 bg-white my-2 rounded-md p-1' placeholder='Enter your email' />
                <input
                    name='password'
                    value={forgotData.password}
                    type="password"
                    onChange={handlechange}
                    placeholder='New Password'
                    className='w-60 h-10 bg-white p-1 my-2 rounded-md' />
                <button className='p-2 rounded-md text-white font-semibold hover:bg-blue-700 cursor-pointer bg-blue-600'>
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default Forgotpassword