"use client"
import { GetAllGames } from '@/actions/GetAllGames'
import { getUserInfo } from '@/utils/jose'
import { game } from '@prisma/client'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Page({ }: Props) {
  const [userid, setuserid] = useState<any>("")
  const [games, setgames] = useState<game[] | null>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [load  ,setload ] = useState<boolean>(true)

  const getuserid = async () => {
    const data = await getUserInfo()
    if (data) {
      setuserid(data?.id)
      
    } else {
      setuserid("")
    }
  }

  const AllGames = async () => {
    const data = await GetAllGames(userid)
    if (data) {
      setgames(data)
      setload(false)
    }
  }

  useEffect(() => {
    getuserid()
  }, [])
  useEffect(() => {
    AllGames()
  }, [userid])

  const filteredGames = games?.filter(game => game.id.includes(searchTerm))

  return (
    <>
    {
      load ? <div>loading</div> :<main>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by Game ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='px-4 py-2 border w-full bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-500 border-red-500 sm:text-sm'
          />
      </div>
      {
        filteredGames?.map((game, index) => {
          return (
            <section key={index} className="mx-10 border-2 p-6 border-gray-100 rounded-lg my-5 bg-gray-800">
              <div className='flex justify-between'>
                <div className='text-red-500 text-[10px] mt-5'> Game Id : <span className='text-white'>{game.id}</span></div>
                <div className='flex gap-x-72'>
                  <div className='p-3 bg-red-500 rounded-xl'>Your Points : {game.PlayerPoints}</div>
                  <div className='p-3 bg-red-500 rounded-xl'>Comp Points : {game.ComputerPoints}</div>
                </div>
                <div className='text-green-400 font-bold w-[150px] flex'> <span className='text-white'>WonBy :</span> {game.wonby == userid ? "You" : <div className='text-red-500'>Computer</div>}</div>
              </div>
              {/* Headings  */}
              <div className='flex justify-around -mb-5 mt-10 border-[2px] border-gray-500 p-3   rounded-t-[8px]'>
                <h5 className='font-bold underline text-red-500 text-xl'>Player Turns </h5>
                <h5 className='font-bold underline text-red-500 text-xl'>Computer Turns </h5>
              </div>
              {/*Main thing */}
              <section className='flex justify-between flex-1 mt-5 border-[2px] border-gray-500   rounded-b-[8px] gap-[80px] '>
                <section className='flex flex-1 justify-between border-r-[2px] px-3   '>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 1  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.Player1Turn1.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.Player1Turn1.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.Player1Turn1.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.Player1Turn1.attack}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 2  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.Player1Turn2.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.Player1Turn2.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.Player1Turn2.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.Player1Turn2.attack}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 3  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.Player1Turn3.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.Player1Turn3.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.Player1Turn3.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.Player1Turn3.attack}</div>
                    </div>
                  </div>
                </section>
                <section className='flex flex-1 justify-between px-3  '>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 1  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.ComputerTurn1.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.ComputerTurn1.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.ComputerTurn1.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.ComputerTurn1.attack}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 2  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.ComputerTurn2.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.ComputerTurn2.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.ComputerTurn2.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.ComputerTurn2.attack}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className='font-bold underline text-green-500'> Turns 3  </h6>
                    <div>
                      {/*@ts-ignore*/}
                      <div>name :{game.ComputerTurn3.name}</div>
                      {/*@ts-ignore*/}
                      <div>type :{game.ComputerTurn3.types[0]}</div>
                      {/*@ts-ignore*/}
                      <div>hp :{game.ComputerTurn3.hp}</div>
                      {/*@ts-ignore*/}
                      <div>attak :{game.ComputerTurn3.attack}</div>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          )
        })
      }

    </main>
    }
    </>
    
  )
}
