'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ItemDetail({ params }) {
    const { id } = params
    const [item, setItem] = useState(null)

    useEffect(() => {
        fetch(`/api/items/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [id])

    if (!item) return <div>Loading...</div>

    return (
        <div>
            <h1>{item.title}</h1>
            {item.images && item.images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={`${item.title} - Image ${index + 1}`}
                    width={300}
                    height={300}
                />
            ))}
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
            <p>Location: {item.location}</p>
            <p>Contact: {item.contact}</p>
            <p>Seller: {item.seller.name}</p>
        </div>
    )
}