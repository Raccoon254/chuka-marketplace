'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/items')
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Second-hand Marketplace</h1>
            {loading ? (
                <div className="flex flex-col justify-center h-[80vh] items-center">
                    <span className="loading loading-ring loading-lg"></span>
                    <div className="text-sm mt-4">loading...</div>
                </div>
            ) : items.length === 0 ? (
                <p className="text-center text-gray-400">No items available at the moment. Please check back later.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                        <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <Link href={`/items/${item.id}`} className="block">
                                {item.images && item.images.length > 0 ? (
                                    <Image
                                        src={item.images[0]}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg">
                                        <span className="text-gray-400">No Image Available</span>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-blue-400">${item.price}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
