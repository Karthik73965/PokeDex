"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { getUserInfo } from '@/utils/jose'
import { SignOut } from '@/actions/HomeActions'


type Props = {}

export default function Navbar({ }: Props) {
    const [Userinfo, setUserinfo] = useState<any>(null)

    const router = useRouter()

    const  hanldeSignOut = async ()=>{
        try {
           await SignOut()
            router.push('/login')     
        } catch (error) {
            
        }
    } 
    useEffect(() => {
        async function getuserinfo() {
            const userinfo = await getUserInfo()
            setUserinfo(userinfo)
        }
        getuserinfo()

    }, [])

    return (
        <nav className={`fixed flex justify-between z-10 bg-black   py-3 px-[5vw]  w-[100vw]  border-b-[1px] h-[72px] border-gray-800 `}>
            <div onClick={()=>router.push('/')} className='text-4xl cursor-pointer font-bold'>poke<span className='text-red-500'>Dex</span></div>
            <ul className='flex gap-x-20 mt-3'>
                <li onClick={() => router.push('/explore')} className='hover:text-gray-400 hover:underline text-lg text-gray-200 cursor-pointer'>Explore</li>
                <li onClick={() => router.push('/1v1')} className='hover:text-gray-400 hover:underline text-lg text-gray-200 cursor-pointer'>Play 1 v 1 </li>
                <li onClick={() => router.push('/see-all-games')} className='hover:text-gray-400 hover:underline text-lg text-gray-200 cursor-pointer'>See all games</li>
            </ul>
            <div className='flex gap-[26px]'>
                {
                    Userinfo ?<> <Button onClick={() => router.push('/profile')} variant={'outline'} className='bg-black'>{Userinfo.name}</Button> <Button onClick={hanldeSignOut} variant={'outline'} className='bg-black text-red-500'>sign out</Button>
                    </>
                        : <>
                            <Button onClick={() => router.push('/login')} variant={'outline'} className='bg-black'>Login</Button>
                            <Button onClick={() => router.push('/signup')} variant={'outline'} className='text-black bg-white'>Signup</Button>
                        </>
                }
            </div>
        </nav>
    )
}