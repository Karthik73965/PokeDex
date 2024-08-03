"use client"
import { getalltxns, getUserdetils } from '@/actions/HomeActions'
import Chart from '@/components/Chart'
import { useRouter } from 'next/navigation'
import { getUserInfo } from '@/utils/jose'
import { Flucuations, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {
  const [userid, setuserid] = useState<any>("")
  const [userinfo, setuserinfo] = useState<User | null>(null)
  const [flucuations, setflucuations] = useState<Flucuations[] | null>(null)

  const router = useRouter()

  const getuserid = async () => {
    const data = await getUserInfo()
    if (data) {
      setuserid(data?.id)
    } else {
      setuserid("")
    }
  }
  const fetch = async () => {
    try {
      const data = await getUserdetils(userid)
      const txnsdata = await getalltxns(userid)
      setuserinfo(data)
      setflucuations(txnsdata)
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    getuserid()
  }, [])

  useEffect(() => {
    if (userid) {
      fetch()
    }

  }, [userid])

  return (
    <main className='mx-10'>
      <section className='flex justify-between mt-10'>
        <div>
          <div className='mb-3 text-xl'> <span className='text-red-500'>Name :</span> {userinfo?.name} </div>
          <div className='mb-3 text-xl'> <span className='text-red-500'>Email :</span> {userinfo?.email} </div>
        </div>
        <div>
          <span className='text-xl ml-3'><span className='text-red-500'>Rating :</span> {userinfo?.rating}</span> <br />
          <button onClick={() => router.push('/1v1')} className="bg-green-500 rounded-xl mt-3 text-white p-2">
            Start New Game
          </button>
        </div>
      </section>
      <section className='mb-10'>
        {/* @ts-ignore */}
        <Chart flucuations={flucuations} />
      </section>
    </main>
  )
}