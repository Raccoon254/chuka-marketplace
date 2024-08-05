import Link from 'next/link'
import Image from 'next/image'
import Navbar from "@/app/components/guest/Navbar";

export default function Home() {
    return (
        <main className="bg-gray-950 text-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-24">
                    <h1 className="text-5xl font-bold mb-6">Chuka Marketplace</h1>
                    <p className="text-xl mb-8">Find great deals on second-hand items</p>
                    <Link href="/browse" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                        Start Browsing
                    </Link>
                </section>

                {/* Featured Categories */}
                <section className="mb-24">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Featured Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {['Electronics', 'Furniture', 'Clothing', 'Books'].map((category) => (
                            <div key={category} className="text-center">
                                <div className="bg-gray-800 rounded-lg p-6 mb-4">
                                    {/* Replace with actual icons or images */}
                                    <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full"></div>
                                </div>
                                <p className="font-medium">{category}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-24">
                    <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Browse', description: 'Explore our wide selection of second-hand items' },
                            { title: 'Connect', description: 'Get in touch with sellers directly' },
                            { title: 'Purchase', description: 'Buy your desired items at great prices' }
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-6">Ready to find your next treasure?</h2>
                    <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                        Sign Up Now
                    </Link>
                </section>
            </div>
        </main>
    )
}