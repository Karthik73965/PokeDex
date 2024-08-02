'use server'
import Redis from "@/lib/Redis"
import prisma from "@/lib/prisma"

export const InitiateGame = async (playerId: string) => {
    console.log(playerId)
    try {
        const push = await Redis.lPush('playerQueue', playerId)
        console.log("Number of pushes: ", push)

        const waitForPlayer = async () => {
            for (let i = 0; i < 10; i++) { 
                const queueLength = await Redis.lLen('playerQueue')
                if (queueLength >= 2) {
                    const Player1 = await Redis.rPop('playerQueue') || ""
                    const Player2 = await Redis.rPop('playerQueue') || ""

                    // Create a new game in the database
                    const newGame = await prisma.game.create({
                        data: {
                            Player1,
                            Player2,
                            result: 'STARTED',
                            wonby: '',
                            lostby: '',
                            Player1Turn1: {},
                            Player1Turn2: {},
                            Player1Turn3: {},
                            Player2Turn1: {},
                            Player2Turn2: {},
                            Player2Turn3: {},
                        }
                    })

                    // Publish game start event
                    const gameStartMessage = JSON.stringify({ gameId: newGame.id, Player1, Player2 })
                    await Redis.publish('gameStarted', gameStartMessage)
                    return { message: 'Game started', gameId: newGame.id }
                }
                await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
            }
            return { message: 'Waiting for another player. Please try again later.' }
        }

        return await waitForPlayer()
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getRandomPokemonAndUpdateGame = async (userId:string, gameId:string) => {
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

        const game = await prisma.game.findUnique({
            where: { id: gameId }
        })

        if (game) {
            const updateData = userId === game.Player1 ? {
                Player1Cards: randomPokemon
            } : {
                Player2Cards: randomPokemon
            }

            await prisma.game.update({
                where: { id: gameId },
                data: updateData
            })
        }

        return randomPokemon

    } catch (error) {
        console.log(error)
        return null
    }
}
