'use client'

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSnackbar} from 'notistack';
import Navbar from "@/app/components/guest/Navbar";

export default function NewItem() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();
    const [categories, setCategories] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});

    useEffect(() => {
        fetch('/api/category')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        //get the current location latitude and longitude
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }, []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title,
                    description,
                    price: parseFloat(price),
                    location,
                    contact,
                    categoryId: parseInt(categoryId),
                    images,
                    sellerId: "66ae784103f26bcf7a04ca87"
                })
            });
            if (response.ok) {
                enqueueSnackbar('Item created successfully!', {variant: 'success'});
                router.push('/');
            } else {
                throw new Error('Failed to create item');
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error creating item. Please try again.', {variant: 'error'});
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-950 grid place-items-center w-full">
                <span className="loading loading-ring loading-lg"></span>
            </main>
        )
    }

    // if we have no current, tell the user to allow location access
    if (currentLocation.latitude === 0 && !currentLocation.longitude === 0) {
        function refreshPage() {
            window.location.reload();
        }
        return (
            <main className="min-h-screen relative bg-gray-950 grid place-items-center w-full">
                <div className="center flex-col">
                    <div>
                        <i className="fas fa-exclamation-triangle text-6xl text-green-600"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-300 p-3">Location Access Required</h1>
                    <p className="text-gray-300 p-2 mb-4">Please allow location access to create an item.</p>
                    <button
                        onClick={refreshPage}
                        className="w-full max-w-md py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Refresh
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-300">
                    <div className="opacity-30 text-xs mb-4">
                        We need your location to provide better location-based services for all items. Please allow location access.
                    </div>
                    <p className="text-sm">Powered by{' '}
                        <a className="text-blue-500" href="https://stevetom.vercel.app">kenTom</a>
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Navbar/>
            <div className="bg-gray-950 h-screen center flex-col">
                <div>
                    <h1 className="text-3xl font-bold text-gray-300 p-6">Create New Item</h1>
                </div>
                <form onSubmit={handleSubmit} className="p-6 max-w-xl grid md:grid-cols-2 gap-4 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2"
                               htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="Location"
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            placeholder="Contact"
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2"
                               htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="images">Images</label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full h-10 file-input bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-gray-300 text-sm font-bold mb-2"
                               htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        {isLoading ? 'Creating Item...' : 'Create Item'}
                    </button>
                </form>
            </div>
        </main>
    )
}
