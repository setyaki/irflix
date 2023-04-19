export default function Hero () {
    return (
        <header className="bg-slate-950 text-white py-24 h-screen ">
            <div className="container flex mx-auto px-4 h-4/5">
                <div className="flex flex-grow justify-between flex-col md:flex-row lg:flex-row ">
                    <div className="flex flex-col ">
                        <h1 className="text-5xl font-bold leading-tight mb-6">Ready to Binge Watch?</h1>
                        <p className="text-xl mb-4">Stay up to date with the favorite movies.</p>
                    </div>
                    <div className="block">
                        <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold py-4 px-8 rounded-full">Subscribe</button>
                    </div>
                </div>
            
            
            </div>
        </header>
    )
}

