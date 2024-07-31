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
                    const player1 = await Redis.rPop('playerQueue') || ""
                    const player2 = await Redis.rPop('playerQueue') || ""

                    // Create a new game in the database
                    const newGame = await prisma.game.create({
                        data: {
                            player1,
                            Player2: player2,
                            result: 'STARTED',
                            wonby: '',
                            lostby: '',
                            Playeer1Turn1: {},
                            Playeer1Turn2: {},
                            Playeer1Turn3: {},
                            Playeer2Turn1: {},
                            Playeer2Turn2: {},
                            Playeer2Turn3: {},
                        }
                    })

                    // Publish game start event
                    const gameStartMessage = JSON.stringify({ gameId: newGame.id, player1, player2 })
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
            const updateData = userId === game.player1 ? {
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
