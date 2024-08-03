"use client"
import { signupUser } from '@/actions/AuthActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignupForm() {

    const [name, setname] = useState<string>("")
    const [email, setemail] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const [load, setload] = useState(false)
    const router = useRouter()



    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await signupUser(name , email , password)
            if(response.status == 201 ){
                window.location.reload()
            }else{
                alert(response.message)
            }
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };

    const HandleSetname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setname(event.target.value);
    };
    const HandleSetemail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setemail(event.target.value);
    };
    const HandeSetpassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setpassword(event.target.value);
    };


    return (
        <center className='mt-10 border-[1px] mx-auto h-auto w-[500px] rounded-2xl shadow-md py-10 shadow-white'>
            <div className='text-4xl underline font-bold mb-6'>poke<span className='text-red-500'>Dex</span></div>
            <form onSubmit={handleSubmit} className='space-y-6 p-10'>
                <div className='flex'>
                    <div className=' text-lg w-[200px] mt-2 font-medium text-white'>Name :</div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={HandleSetname}
                        className='mt-1 block w-full px-3 py-2  border-gray-300 rounded-md shadow-sm focus:outline-none bg-black border-[1px] focus:ring-red-500 focus:border-red-500 sm:text-sm'
                        required
                    />
                </div>
                <div className='flex'>
                    <div className=' text-lg w-[200px] mt-2 font-medium text-white'>Email :</div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={HandleSetemail}
                        className='mt-1 block w-full px-3 py-2  border-gray-300 rounded-md shadow-sm focus:outline-none bg-black border-[1px] focus:ring-red-500 focus:border-red-500 sm:text-sm'
                        required
                    />
                </div>
                <div className='flex'>
                    <div className='  text-lg w-[200px] mt-2 font-medium text-white'>Password :</div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={HandeSetpassword}
                        className='mt-1 block w-full px-3 py-2  border-gray-300 rounded-md shadow-sm focus:outline-none bg-black border-[1px] focus:ring-red-500 focus:border-red-500 sm:text-sm'
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </center>
    );
}
