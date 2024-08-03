"use client"
import { InitiateGame } from '@/actions/gameactions/InitiateGame'
import { getUserInfo } from '@/utils/jose'
import { Pokemon } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Pokemoncard from './Pokemoncard'
import { determineTurnWinner } from '@/algo/Winner'

type Props = {}

export default function StartGame({ }: Props) {
    const [GameId, SetGameId] = useState<string | undefined>(undefined)
    const [userid, setuserid] = useState<any>("")
    const [message, setmessage] = useState<string>("Not started yet")
    const [pokemons, Setpokemons] = useState<Pokemon[]>([])
    const [ComputerPokemons, SetComputerPokemons] = useState<Pokemon[] | null>(null)
    const [turn, setturn] = useState<number>(1)
    const [selected, setselcted] = useState<boolean>(false)
    const [playerselected, setcplayerselected] = useState<Pokemon | null>(null)
    const [computerselected, setcomputerselected] = useState<Pokemon | null>(null)
    const [playerwins, setplayerwins] = useState<number>(0)
    const [computerwins, setcomputerwins] = useState<number>(0)
    const [usedPlayerCards, setUsedPlayerCards] = useState<Set<string>>(new Set())
        const [usedComputerCards, setUsedComputerCards] = useState<Set<string>>(new Set())
    const [turnData, setTurnData] = useState<{ turn1: any, turn2: any, turn3: any }>({ turn1: null, turn2: null, turn3: null });
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    // getting user id from cookies
    const getuserid = async () => {
        const data = await getUserInfo()
        if (data) {
            setuserid(data?.id)
        } else {
            setuserid("")
        }
    }

    // computer selected 
    const computerslectedpokeon: any = () => {
        try {
            if (ComputerPokemons) {
                let pokemon;
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * ComputerPokemons.length);
                    pokemon = ComputerPokemons[randomIndex];
                } while (usedComputerCards.has(pokemon.id));

                setcomputerselected(pokemon)
                setUsedComputerCards(prevSet => new Set(prevSet).add(pokemon.id))
                return pokemon
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // submit turn 
    const submitturn = async () => {
        try {
            const computer = computerslectedpokeon()
            if (computer && playerselected) {
                const winner = await determineTurnWinner(playerselected, computer)
                if (winner.winner == "player") {
                    setplayerwins(playerwins + 1)
                } else if (winner.winner == "computer") {
                    setcomputerwins(computerwins + 1)
                } else {
                    setplayerwins(playerwins + 1)
                    setcomputerwins(computerwins + 1)
                }

                setTurnData(prevData => ({
                    ...prevData,
                    [`turn${turn}`]: { player: playerselected, computer: computer }
                }));

                setselcted(false)
                setturn(turn + 1)
                if (turn === 3) {
                    winnerreveal()
                }
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const winnerreveal = async () => {
        try {
            setTimeout(async () => {
                let winnerMessage = '';
                let result = 'ENDED';
                let wonby = '';
                let lostby = '';

                if (playerwins > computerwins) {
                    winnerMessage = "Player wins the game!";
                    wonby = userid;
                    lostby = 'computer';
                } else if (computerwins > playerwins) {
                    winnerMessage = "Computer wins the game!";
                    wonby = 'computer';
                    lostby = userid;
                } else {
                    winnerMessage = "The game is a draw!";
                    wonby = 'draw';
                    lostby = 'draw';
                }

                alert(winnerMessage);
                console.log(turnData)

                const gameData = {
                    gameId: GameId,
                    result,
                    wonby,
                    lostby,
                    Player1Turn1: turnData.turn1.player,
                    Player1Turn2: turnData.turn2.player,
                    Player1Turn3: turnData.turn3.player,
                    ComputerTurn1: turnData.turn1.computer,
                    ComputerTurn2: turnData.turn2.computer,
                    ComputerTurn3: turnData.turn3.computer,
                    Player1Cards: JSON.stringify(pokemons),
                    ComputerCards: JSON.stringify(ComputerPokemons),
                    turn1: JSON.stringify(turnData.turn1),
                    turn2: JSON.stringify(turnData.turn2),
                    turn3: JSON.stringify(turnData.turn3),
                    playerwins,
                    computerwins
                };

                try {
                    const response = await fetch('/api/updateGame', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(gameData),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update the game');
                    }

                    const updatedGame = await response.json();
                    console.log('Game updated successfully:', updatedGame);

                    setGameEnded(true);
                } catch (error) {
                    console.error('Error updating the game:', error);
                }
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const Selecting = (pokemon: Pokemon) => {
        if (usedPlayerCards.has(pokemon.id)) {
            alert("You can't select this card again!")
            return
        }
        setcplayerselected(pokemon)
        setUsedPlayerCards(prevSet => new Set(prevSet).add(pokemon.id))
        setselcted(true)
    }

    const startgame = async () => {
        const starting = await InitiateGame(userid)
        if (starting.gameInfo) {
            setmessage(starting.message)
            SetGameId(starting.gameInfo.id)
            Setpokemons(starting.playercards)
            SetComputerPokemons(starting.ComputerCards)
        } else {
            setmessage("Something went wrong")
        }
    }

    const handleStartgme = async () => {
        setmessage("Going to start, please wait...")
        await startgame()
    }
    const handleRestartgame = async () => {
        SetGameId(undefined);
        setmessage("Not started yet");
        Setpokemons([]);
        SetComputerPokemons(null);
        setturn(1);
        setselcted(false);
        setcplayerselected(null);
        setcomputerselected(null);
        setplayerwins(0);
        setcomputerwins(0);
        setUsedPlayerCards(new Set());
        setUsedComputerCards(new Set());
        setTurnData({ turn1: null, turn2: null, turn3: null });
        setGameEnded(false);
    }
    useEffect(() => {
        getuserid()
    }, [])

    useEffect(() => {
        if (turn > 3) {
            winnerreveal()
        }
    }, [turn])

    if (gameEnded) {
        // Reset the game state to start a new game or show the game over screen
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <h1 className="text-4xl font-bold">Game Over</h1>
                <button onClick={handleRestartgame} className="bg-green-500 rounded-xl mt-10 text-white p-5">
                    Start New Game
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-900 min-h-screen  text-white">
            <section className='flex justify-between'>
                <div className="  grid   m-4">
                    <div>GameId: {GameId}</div>
                    <div>message: {message}</div>
                    <div>player wins: {playerwins}</div>
                    <div>comp wins: {computerwins}</div>
                </div>
                <div>
                    {userid ? (
                        <div className="flex justify-center">
                            {pokemons.length > 0 ? (
                                <>
                                </>
                            ) : (
                                <button onClick={handleStartgme} className="bg-green-500 rounded-xl mt-10 text-white w-[150px] p-5">
                                    Start Game
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="text-center">Something went wrong</div>
                    )}
                    {
                        selected && (
                            <div className="flex justify-center">
                                <button onClick={submitturn} className="bg-green-500 rounded-xl mt-10 text-white w-[150px] p-5">
                                    Make turn {turn}
                                </button>
                            </div>
                        )
                    }
                </div>
            </section>
            <main className='flex flex-wrap justify-center -mt-10 '>
                {pokemons.map((pokemon, index) => (
                    <section
                        key={index}
                        onClick={() => Selecting(pokemon)}
                        className={`m-2 p-4 rounded-lg cursor-pointer scale-75 ${usedPlayerCards.has(pokemon.id) ? 'opacity-50  cursor-not-allowed' : 'bg-gray-800  hover:bg-gray-700'}`}
                    >
                        <div className='text-2xl text-red-500 mb-2'>Card no: {index + 1}</div>
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
                ))}
            </main>
            <div className='text-3xl text-center -mt-10'>{ComputerPokemons ? "Computer pokemons" : ""}</div>
            <main className='flex flex-wrap justify-center -mt-10 '>
                {ComputerPokemons && ComputerPokemons.map((pokemon, index) => (
                    <>
                        <section
                            key={index}
                            className={`m-2 p-4 rounded-lg scale-75 ${usedComputerCards.has(pokemon.id) ? 'opacity-50 cursor-not-allowed' : 'bg-gray-800'}`}
                        >
                            <div className='text-2xl text-red-500 mb-2'>Card no: {index + 1}</div>
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
                    </>
                ))}
            </main>
        </div>
    )
}
