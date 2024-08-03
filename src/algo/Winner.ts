'use server'
import { Pokemon } from "@prisma/client";

export const determineTurnWinner = async (playerPokemon:Pokemon, ComputerPokemon: Pokemon) => {
    // Basic comparison based on Pokémon stats
    const player1Score = playerPokemon.attack + playerPokemon.defense + playerPokemon.hp;
    const player2Score = ComputerPokemon.attack + ComputerPokemon.defense + ComputerPokemon.hp;

    if (player1Score > player2Score) {
        return { winner: 'player', playerPokemon, ComputerPokemon };
    } else if (player2Score > player1Score) {
        return { winner: 'computer', playerPokemon, ComputerPokemon };
    } else {
        return { winner: 'draw', playerPokemon, ComputerPokemon };
    }
};

export const determineOverallWinner = (game:any) => {
    const turnWinners = [game.turn1, game.turn2, game.turn3];
    console.log("turnWinners" , turnWinners)

    const player1Wins = turnWinners.filter(turn => turn.wonby === 'player1').length;
    const player2Wins = turnWinners.filter(turn => turn.lost === 'player2').length;

    if (player1Wins > player2Wins) {
        return { wonby: game.Player1, lostby: game.Player2 };
    } else if (player2Wins > player1Wins) {
        return { wonby: game.Player2, lostby: game.Player1 };
    } else {
        return { wonby: 'draw', lostby: 'draw' };
    }
};
