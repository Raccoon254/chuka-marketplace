'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function ItemDetail({params}) {
    const {id} = params
    const [item, setItem] = useState(null)

    useEffect(() => {
        fetch(`/api/items/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [id])

    if (!item) return (
        <div className="h-screen bg-gray-950 flex flex-col items-center justify-center">
            <span className="loading loading-ring loading-lg"></span>
            <div className="text-sm mt-4">loading...</div>
        </div>
    )

    return (
        <div className="bg-gray-950 mx-auto p-4 h-screen text-gray-900 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {item.images &&
                    item.images.map((image, index) => (
                        <div key={index} className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src={image}
                                alt={`${item.title} - Image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    ))}
            </div>
            <div className="p-4 bg-white bg-opacity-5 rounded-lg shadow-md">
                <p className="text-xl font-semibold mb-2">Price: <span className="text-blue-600">${item.price}</span>
                </p>
                <p className="mb-4"><span className="font-semibold">Description:</span> {item.description}</p>
                <p className="mb-4"><span className="font-semibold">Location:</span> {item.location}</p>
                <p className="mb-4"><span className="font-semibold">Contact:</span> {item.contact}</p>
            </div>

            {/*Back button*/}
            <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
                Back
            </button>
        </div>
    );

}