import Link from 'next/link'
import Image from 'next/image'
import Navbar from "@/app/components/guest/Navbar";

export default function Home() {
    const categories = {
        'Electronics': 'fas fa-laptop',
        'Furniture': 'fas fa-couch',
        'Clothing': 'fas fa-tshirt',
        'Appliances': 'fas fa-blender',
    }

    //['Electronics', 'Furniture', 'Clothing', 'Books']

    return (
        <main className="bg-gray-950 text-white min-h-screen">
            <Navbar/>
            <div className="">
                {/* Hero Section */}
                <section id="hero" className="text-center text-gray-400 h-[80vh] relative flex-col mb-12">
                    <div
                        className={`h-[80vh] z-10 flex flex-col bg-gray-950 bg-opacity-90 center justify-center items-center`}>
                        <h1 className="text-5xl font-bold mb-6">Chuka Marketplace</h1>
                        <p className="text-xl mb-8">Find great deals on second-hand items</p>
                        <Link href="catalog"
                              className="ring-blue-600 flex items-center hover:bg-blue-700 hover:bg-opacity-15 hover:text-white ring-2 hover:ring-blue-700 text-gray-400 font-bold py-3 px-6 rounded-full transition duration-300">
                            Browse Items
                        </Link>
                    </div>
                </section>

                <div className="container mx-auto px-4 pb-24">
                    {/* Featured Categories */}
                    <section className="mb-44">
                        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {Object.keys(categories).map(category => (
                                <div key={category} className="text-center">
                                    <div className="bg-gray-800 rounded-lg p-6 mb-4">
                                        {/* Replace with actual icons or images */}
                                        <div className="w-16 h-16 center mx-auto bg-gray-700 rounded-full">
                                            <i className={`${categories[category]} text-3xl text-white`}></i>
                                        </div>
                                    </div>
                                    <p className="font-medium">{category}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="mb-44">
                        <h2 className="text-3xl font-semibold mb-12 text-center">How It Works</h2>
                        <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
                            {[
                                {title: 'Browse', description: 'Explore our wide selection of second-hand items'},
                                {title: 'Connect', description: 'Get in touch with sellers directly'},
                                {title: 'Purchase', description: 'Buy your desired items at great prices'}
                            ].map((step, index) => (
                                <div key={index} className="md:text-center border-b md:border-none pb-4 border-gray-700">
                                    <div
                                        className="bg-gray-800 rounded-lg md:rounded-full w-16 h-16 flex items-center justify-center md:mx-auto mb-4">
                                        <span className="text-2xl font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        <p className="font-thin">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="text-center">
                        <h2 className="text-3xl font-semibold mb-6">Ready to find your next treasure?</h2>
                        <Link href="auth/register"
                              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
                            Sign Up Now
                        </Link>
                    </section>
                </div>
            </div>
        </main>
    )
}