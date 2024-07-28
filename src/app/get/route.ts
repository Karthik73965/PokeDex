import { CreatePokemon } from "@/actions/PokemonAcitions";
import { pokemonNames } from "@/utils/Pokemons";
import { NextResponse } from "next/server";




// this route is only created for testing in postman 
export async function POST(req: Request, res: NextResponse) {
    try {
        const data = await CreatePokemon(pokemonNames)

        return NextResponse.json({ message: "successfully fetched data", data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "error fetching data" });
    }
}
