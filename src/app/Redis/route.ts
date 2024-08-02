'use server'
import Redis from "@/lib/Redis";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try{
    const flush = await Redis.flushAll()
    return NextResponse.json(flush)
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