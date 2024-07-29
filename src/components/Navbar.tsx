"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


type Props = {}

export default function Navbar({ }: Props) {
    const [login, setlogin] = useState<boolean>(false)
    const router = useRouter()

    return (
        <nav className={`fixed flex justify-between z-10   py-3 px-[5vw]  w-[100vw] bg-transparent border-b-[1px] h-[72px] border-gray-800 `}>
            <div className='text-4xl font-bold'>poke<span className='text-red-500'>Dex</span></div>
            <ul>
                <li></li>
            </ul>
            <div className='flex gap-[26px]'>
                <Button onClick={()=>router.push('/login')} variant={'outline'} className='bg-black'>Login</Button>
                <Button onClick={()=>router.push('/signup')} variant={'outline'} className='text-black bg-white'>Signup</Button>
            </div>
        </nav>
    )
}