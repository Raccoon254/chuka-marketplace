import React from 'react';
import Link from 'next/link';
import { FaRecycle, FaHandshake, FaUsers, FaLeaf } from 'react-icons/fa';
import Navbar from "@/app/components/guest/Navbar";

export default function About() {
    return (
        <main className="bg-gray-950 text-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">About Chuka Marketplace</h1>

                {/* Mission Statement */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg mb-4">
                        At Chuka Marketplace, we're on a mission to revolutionize the way people buy and sell second-hand items. We believe in creating a sustainable, community-driven platform that not only helps people find great deals but also reduces waste and promotes a circular economy.
                    </p>
                    <p className="text-lg">
                        Our goal is to make the process of buying and selling pre-loved items as easy, safe, and enjoyable as possible, while fostering a sense of community among our users.
                    </p>
                </section>

                {/* Key Features */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">What Sets Us Apart</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <FaRecycle className="w-12 h-12 mb-4 text-green-500" />,
                                title: "Sustainability Focus",
                                description: "By promoting the reuse of items, we're actively contributing to waste reduction and environmental conservation."
                            },
                            {
                                icon: <FaHandshake className="w-12 h-12 mb-4 text-blue-500" />,
                                title: "User-Friendly Platform",
                                description: "Our intuitive interface makes it easy for anyone to list items or find exactly what they're looking for."
                            },
                            {
                                icon: <FaUsers className="w-12 h-12 mb-4 text-yellow-500" />,
                                title: "Community-Driven",
                                description: "We foster a strong sense of community, encouraging users to interact, share stories, and build connections."
                            },
                            {
                                icon: <FaLeaf className="w-12 h-12 mb-4 text-green-500" />,
                                title: "Eco-Friendly Choice",
                                description: "By choosing second-hand, our users are making a positive impact on the environment with every transaction."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-900 p-6 rounded-lg">
                                {feature.icon}
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
                    <ol className="list-decimal list-inside space-y-4 text-lg">
                        <li><strong>Sign Up:</strong> Create your free account to start buying or selling.</li>
                        <li><strong>Browse or List:</strong> Search for items you need or list items you want to sell.</li>
                        <li><strong>Connect:</strong> Use our secure messaging system to communicate with buyers or sellers.</li>
                        <li><strong>Transact:</strong> Meet in person or arrange shipping to complete your transaction.</li>
                        <li><strong>Rate and Review:</strong> Share your experience to help build trust in our community.</li>
                    </ol>
                </section>

                {/* Our Story */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                    <p className="text-lg mb-4">
                        Chuka Marketplace was born out of a simple idea: to create a platform where people could easily buy and sell second-hand items while making a positive impact on the environment. Founded in 2023 by a group of students from Chuka University, our platform has grown from a small campus initiative to a thriving online community.
                    </p>
                    <p className="text-lg">
                        We're proud of how far we've come, but we're even more excited about the future. As we continue to grow, we remain committed to our core values of sustainability, community, and user empowerment.
                    </p>
                </section>

                {/* Join Us */}
                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-6">Join Our Community</h2>
                    <p className="text-lg mb-6">
                        Whether you're looking to declutter your space, find unique items, or just want to be part of a community that cares about sustainability, Chuka Marketplace is the place for you.
                    </p>
                    <Link href="auth/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                        Sign Up Now
                    </Link>
                </section>
            </div>
        </main>
    );
}