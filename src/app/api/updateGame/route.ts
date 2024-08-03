import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const {
      gameId,
      result,
      wonby,
      lostby,
      Player1Turn1,
      Player1Turn2,
      Player1Turn3,
      ComputerTurn1,
      ComputerTurn2,
      ComputerTurn3,
      Player1Cards,
      ComputerCards,
      turn1,
      turn2,
      turn3,
      playerwins,
      computerwins,
    } = await req.json();

    // Update the game data
    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data: {
        result,
        wonby,
        lostby,
        Player1Turn1,
        Player1Turn2,
        Player1Turn3,
        ComputerTurn1,
        ComputerTurn2,
        ComputerTurn3,
        Player1Cards,
        ComputerCards,
        turn1,
        turn2,
        turn3,
        PlayerPoints: playerwins,
        ComputerPoints: computerwins,
      },
    });

    // Fetch player details
    const playerdetails = await prisma.user.findUnique({
      where: { id: updatedGame.Player1 },
    });

    if (!playerdetails) {
      throw new Error('Failed to fetch player details');
    }

    let rating = 100;

    // Determine the new rating
    if (updatedGame.wonby === updatedGame.Player1) {
      rating = playerdetails.rating + 10;
    } else {
      rating = playerdetails.rating - 10;
    }
// update user rating 
const updateuserrating = await prisma.user.update({
  where:{id :playerdetails.id } , 
  data:{
    rating
  }
})
  

    // Create a fluctuation transaction
    const createtxns = await prisma.flucuations.create({
      data: {
        userId: updatedGame.Player1,
        gameid: updatedGame.id,
        transaction: {
          realised: rating - playerdetails.rating,
          rating,
        },
      },
    });


    console.log("Changed rating:", rating);
    console.log("Transaction:", createtxns);

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
