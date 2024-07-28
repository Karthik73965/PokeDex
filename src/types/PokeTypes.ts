
export type PokemonType = {
    type: {
        name: string;
    };
}

export type PokemonAbility= {
    ability: {
        name: string;
    };
}

export type PokemonStat= {
    stat: {
        name: string;
    };
    base_stat: number;
}
export type PokemonData= {
    name: string;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
}

export type FormattedPokemonData ={
    name: string;
    type: string[];
    abilities: string[];
    baseStats: Record<string, number>;
}