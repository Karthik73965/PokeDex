import { Flucuations } from '@prisma/client';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
    flucuations: Flucuations[]
}

export default function Chart({ flucuations }: Props) {
    return (
        <main className='bg-gray-800 mt-10 p-5 rounded-lg'>
            <section className='justify-between'>
                <h1 className='text-[40px]'>Rating History</h1><br />
                <div>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={flucuations}>
                            <XAxis
                                dataKey="createdAt"
                                tickFormatter={(createdAt) => new Date(createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                type="category"
                            />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(value) => new Date(value).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            />
                            <Line type="monotone" dataKey="transaction.rating" stroke="#f44336" connectNulls />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </main>
    )
}
