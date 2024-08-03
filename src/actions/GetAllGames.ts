'use server'

import prisma from "@/lib/prisma"

export const GetAllGames = async (Player1:string)=>{
    try {
        const AllGames = await prisma.game.findMany({
            where:{Player1 , result:"ENDED"}    
        })  
        return AllGames      
    } catch (error) {
        console.log(error)
        return null         
    }
}