'use server'
import { Pokemon } from "@prisma/client";

export const determineTurnWinner = (player1Pokemon:any, player2Pokemon: any) => {
    // Basic comparison based on Pokémon stats
    const player1Score = player1Pokemon.attack + player1Pokemon.defense + player1Pokemon.hp;
    const player2Score = player2Pokemon.attack + player2Pokemon.defense + player2Pokemon.hp;

    if (player1Score > player2Score) {
        return { winner: 'player1', player1Pokemon, player2Pokemon };
    } else if (player2Score > player1Score) {
        return { winner: 'player2', player1Pokemon, player2Pokemon };
    } else {
        return { winner: 'draw', player1Pokemon, player2Pokemon };
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
