'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/items')
        .then(res => res.json())
        .then(data => setItems(data))
  }, [])

  return (
      <div>
        <h1>Second-hand Marketplace</h1>
        <ul>
          {items.map(item => (
              <li key={item.id}>
                <Link href={`/items/${item.id}`}>
                  {item.images && item.images.length > 0 && (
                      <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={100}
                          height={100}
                      />
                  )}
                  <span>{item.title} - ${item.price}</span>
                </Link>
              </li>
          ))}
        </ul>
      </div>
  )
}