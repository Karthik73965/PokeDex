"use client";
import { getAllPokemons } from '@/actions/PokemonAcitions';
import Pokemoncard from '@/components/Pokemoncard';
import { Pokemon } from '@prisma/client';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function Page({ }: Props) {
    const [Pokemons, SetPokemons] = useState<Pokemon[] | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [load , setload] = useState<boolean>(true)

    useEffect(() => {
        async function Allpokemons() {
            const data = await getAllPokemons();
            SetPokemons(data);
            setload(false)
        }
        Allpokemons();
    }, []);

    const filteredPokemons = searchTerm
        ? Pokemons?.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : Pokemons;

    console.log(filteredPokemons);

    return (
        <section>
       {
        load ? <div>loading</div>:  <main>
        <div className='flex justify-center my-4'>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='px-4 py-2 border bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-500 border-red-500 sm:text-sm'
            />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
                filteredPokemons?.map((pokemon) => (
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
                ))
            }
        </div>
    </main>
       }
       </section>
    );
}
