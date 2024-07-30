'use server'
import prisma from "@/lib/prisma";
import { FormattedPokemonData, PokemonData } from "@/types/PokeTypes";
import { pokemonNames } from "@/utils/Pokemons";
import axios from "axios";


export async function CreatePokemon(list: string[]) {
    const pokedata: FormattedPokemonData[] = [];

    for (let i = 0; i < list.length; i++) {
        console.log("pokemon name:", pokemonNames[i]);

        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`
        );
        const pokemonData: PokemonData = response.data;

        const { name, types, abilities, stats, sprites } = pokemonData;
        const imageUrl = sprites.other ? sprites.other['official-artwork'].front_default : sprites.front_default;


        const formattedData: FormattedPokemonData = {
            name,
            type: types.map((type) => type.type.name),
            abilities: abilities.map((ability) => ability.ability.name),
            baseStats: stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc
            }, {} as Record<string, number>),
            imageUrl
        };
        console.log(formattedData)
        await prisma.pokemon.create({
            data: {
                name: formattedData.name,
                types: formattedData.type,
                abilities: formattedData.abilities,
                hp: formattedData.baseStats.hp,
                attack: formattedData.baseStats.attack,
                defense: formattedData.baseStats.defense,
                specialAttack: formattedData.baseStats['special-attack'],
                specialDefense: formattedData.baseStats['special-defense'],
                speed: formattedData.baseStats.speed,
                imageUrl: formattedData.imageUrl, // Store image URL in the database
            }
        })
    }
    return "done"
}

export const getAllPokemons = async () => {
    try {
        const Pokemons = await prisma.pokemon.findMany()
        return Pokemons
    } catch (error) {
        console.log(error)
        return null
    }
}