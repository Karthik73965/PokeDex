'use server'
import Redis from "@/lib/Redis"
import prisma from "@/lib/prisma"

export const InitiateGame = async (playerId: string) => {

    console.log(playerId)
    try {
        const getcards = await GetRandomcards()
        const ComputerCards = await GetRandomcards()
        if (getcards) {

            const Newgame = await prisma.game.create({
                data: {
                    Player1: playerId,
                    Player1Cards: getcards,
                    ComputerCards,
                    result: "STARTED"
                }
            })
            return {
                gameInfo :Newgame,
                playercards :getcards,
                ComputerCards, 
                message: "Game started"
            }
        } else {
            return {
                message: "went wrong started"
            }
        }
    } catch (error) {
        console.log(error)
        return {
            message: "something wrong started"
        }
    }
}

export const GetRandomcards = async () => {
    try {
        const allPokemonIds = await prisma.pokemon.findMany({
            select: { id: true }
        })

        const shuffledIds = allPokemonIds.map(pokemon => pokemon.id).sort(() => 0.5 - Math.random())

        const randomIds = shuffledIds.slice(0, 3)

        const randomPokemon = await prisma.pokemon.findMany({
            where: {
                id: {
                    in: randomIds
                }
            }
        })
        return randomPokemon

    } catch (error) {
        console.log(error)
        return null
    }
}
