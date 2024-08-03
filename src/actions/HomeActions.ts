'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

export const getUserdetils = async (id: string) => {
    try {
        const info = await prisma.user.findUnique({
            where: { id }
        })
        return info

    } catch (error) {
        console.log(error)
        throw Error("error ")
    }
}
export const getalltxns = async (id: string) => {
    try {
        const txns = await prisma.flucuations.findMany({
            where: { userId: id }
        })
        return txns
    } catch (error) {
        console.log(error)
        throw Error("error ")
    }
}

export const SignOut = async  ()=>{
    try {
         await cookies().delete("token")
    } catch (error) {
        
    }
}