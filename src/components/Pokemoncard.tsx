import React from 'react'

type Props = {
    id: string,
    name: string,
    types: string[],
    abilities: string[],
    imageUrl: string,
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
}

export default function Pokemoncard({ id, name, types, abilities, imageUrl, hp, attack, defense, specialAttack, specialDefense, speed }: Props) {
    return (
        <section className='w-[300px] mb-5  pb-4  bg-gray-900 border-[1px] border-red-500 rounded-[8px] shadow-white shadow-md'>
            <div className='text-right  mt-1 '> <span className=' bg-red-500 text-white p-1 rounded-[8px] mr-1 '>HP :{hp}</span></div>
            <img className='mx-auto w-[150px] -mt-5 h-[150px]' src={imageUrl} alt={name} />
            <div className='text-2xl text-center uppercase font-semibold mt-2'>{name}</div>
            <div className='w-full border-b-[3px] rounded-full h-3 border-red-500'></div>
            {/* types */}
            <div className='flex gap-[10px] mt-3 px-2'>
                <span className='w-[120px]'> Type </span> :
                {
                    types.map((i, index) => {
                        return <div key={index} className='text-black bg-white px-3 rounded-[8px]'>
                            {i}

                        </div>
                    })
                }
            </div>
            {/* ablilities */}
            <div className='flex  flex-1 gap-[10px] mt-3 px-2'>
                <div className='w-[120px]'>   Abilities </div> :
                <div className='flex-grow basis-0 gap-[10px] '>
                    {
                        abilities.map((i, index) => {
                            return <div key={index} className='text-black mb-2 text-sm bg-white px-3 rounded-[8px]'>
                                {i}

                            </div>
                        })
                    }
                </div>
            </div>
            {/* attack */}
            <div className='flex gap-[10px] mt-3 px-2'>
                <span className='w-[120px]'>  Attack  </span>: <div className='text-black bg-white px-3 rounded-[8px]'>
                    {attack}
                </div>
            </div>
            {/* defense */}
            <div className='flex gap-[10px] mt-3 px-2'>
                <span className='w-[120px]'>Defense </span> : <div className='text-black bg-white px-3 rounded-[8px]'>
                    {defense}
                </div>
            </div>
            {/* specialAttack */}
            <div className='flex gap-[10px] mt-3 px-2'>
                <span className='w-[120px]'> SpecialAttack </span> : <div className='text-black bg-white px-3 rounded-[8px]'>
                    {specialAttack}
                </div>
            </div>
            {/* specialDefense */}
            <div className='flex gap-[10px] mt-3 px-2'>
                <span className='w-[120px]'>SpecialDefense</span> : <div className='text-black bg-white px-3 rounded-[8px]'>
                    {specialDefense}
                </div>
            </div>
            <div>

            </div>

        </section>
    )
}