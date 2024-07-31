"use client"
import { getRandomPokemonAndUpdateGame, InitiateGame } from '@/actions/gameactions/InitiateGame'
import { getUserInfo } from '@/utils/jose'
import { Pokemon } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Pokemoncard from './Pokemoncard'

type Props = {}

export default function StartGame({ }: Props) {
    const [GameId, SetGameId] = useState<string | undefined>(undefined)
    const [userid, setuserid] = useState<any>("")
    const [message, setmessage] = useState<string>("Not started yet")
    const [pokemons, Setpokemons] = useState<Pokemon[]>()

    // getting user id from cookies
    const getuserid = async () => {
        const data = await getUserInfo()
        if (data) {
            setuserid(data?.id)
        } else {
            setuserid("")
        }
    }
    // getting pokeomons and updating the game document
    const getcards = async () => {
        try {
            const data = await getRandomPokemonAndUpdateGame(userid, GameId || "")
            if (data) {
                Setpokemons(data)
            } else {
                setmessage("setpokemons errror")
            }


        } catch (error) {

        }
    }
    //starting a game 
    const startgame = async () => {
        const starting = await InitiateGame(userid)
        if (starting) {
            setmessage(starting.message)
            SetGameId(starting.gameId)
            await getcards()
        } else {
            setmessage("something went wrong")
            SetGameId("Y bro ")
        }
    }

    //  onclick 
    const handleStartgme = async () => {
        setmessage("going to start on progress")
        await startgame()
    }
    useEffect(() => {
        getuserid()
    }, [])

    return (
        <>
            <div>GameId : {GameId}</div>
            <div>userid : {userid}</div>
            <div>message : {message}</div>
            {userid ? (
                <div>
                    {pokemons ? (
                        <>
                        </>
                    ) : (
                        <button onClick={handleStartgme} className="bg-green-500 rounded-xl mt-10 text-white w-[150px] p-5">
                            Start Game
                        </button>
                    )}
                </div>
            ) : (
                <div>Something went wrong</div>
            )}

            <main className='flex justify-between'>
                {
                    pokemons && pokemons?.map((pokemon, index) => (
                        <section key={index}>
                            <div className='text-2xl text-red-500'> Card no : {index + 1}</div>
                            <Pokemoncard
                                key={pokemon.id}
                                id={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types}
                                abilities={pokemon.abilities}
                                imageUrl={pokemon.imageUrl}
                                hp={pokemon.hp}
                                attack={pokemon.attack}
                                defense={pokemon.defense}
                                specialAttack={pokemon.specialAttack}
                                specialDefense={pokemon.specialDefense}
                                speed={pokemon.speed}
                            />
                        </section>
                    ))
                }
            </main>
        </>
    )
}