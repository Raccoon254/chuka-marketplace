'use client'
import React, {useState} from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Navbar from "@/app/components/guest/Navbar";
import {useSnackbar} from "notistack";

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email')
            enqueueSnackbar('Invalid email', {variant: 'error'})
            return
        }

        if (!validateMessage(message)) {
            setMessageError('Message must be at least 4 characters')
            enqueueSnackbar('Message must be at least 4 characters', {variant: 'error'})
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, message}),
            });
            if (response.ok) {
                enqueueSnackbar('Message sent successfully', {variant: 'success'})
                setIsLoading(false)
            } else {
                setIsLoading(false)
                const data = await response.json();
                enqueueSnackbar(data.message || 'Error sending message', {variant: 'error'})
            }
        } catch (error) {
            setIsLoading(false)
            enqueueSnackbar('Error sending message', {variant: 'error'})
        }
    };

    const validateEmail = (email) => {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        return re.test(email)
    }

    const validateMessage = (message) => {
        return message.length >= 4
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-950 grid place-items-center w-full">
                <span className="loading loading-ring loading-lg"></span>
            </main>
        )
    }

    return (
        <main className="bg-gray-950 text-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <FaPhone className="mr-4 text-green-500" />
                                +254 758 481 320
                            </p>
                            <p className="flex items-center">
                                <FaEnvelope className="mr-4 text-green-500" />
                                contact@chukamarketplace.com
                            </p>
                            <p className="flex items-center">
                                <FaMapMarkerAlt className="mr-4 text-green-500" />
                                123 Moi Avenue, Nairobi, Kenya
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold mt-8 mb-4">Business Hours</h3>
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <FaClock className="mr-4 text-green-500" />
                                Monday - Friday: 9:00 AM - 6:00 PM
                            </p>
                            <p className="flex items-center">
                                <FaClock className="mr-4 text-green-500" />
                                Saturday: 10:00 AM - 4:00 PM
                            </p>
                            <p className="flex items-center">
                                <FaClock className="mr-4 text-green-500" />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 rounded"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            width="100%"
                            height="450"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.03023165325!2d37.62800181578534!3d-0.32589732893724227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1827b87d15133c4b%3A0x989bec815b0252c5!2sChuka!5e0!3m2!1sen!2ske!4v1722851071101!5m2!1sen!2ske" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
}