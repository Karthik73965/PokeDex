'use server'
import Redis from "@/lib/Redis";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/golduck`);
    const pokemonData: PokemonData = response.data;

    const { name, types, abilities, stats } = pokemonData;

    const formattedData: FormattedPokemonData = {
      name,
      type: types.map(type => type.type.name),
      abilities: abilities.map(ability => ability.ability.name),
      baseStats: stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
      }, {} as Record<string, number>),
    };
    console.log(formattedData)
    return NextResponse.json({ message: 'Value set successfully', formattedData }, {
      status: 201
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'something went wrong successfully' }, {
      status: 500
    });
  }
}


interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonStat {
  stat: {
    name: string;
  };
  base_stat: number;
}

interface PokemonData {
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

interface FormattedPokemonData {
  name: string;
  type: string[];
  abilities: string[];
  baseStats: Record<string, number>;
}