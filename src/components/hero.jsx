import Image from "next/image"
import { PlayCircle } from "@phosphor-icons/react";

export default function Hero (props) {
    console.log(props.movie)
    const imageURL = `${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`;

    console.log("Image URL:", imageURL);


    return (
        <header className="bg-slate-950 text-white py-24 h-screen ">
            <div className="container flex mx-auto px-4 h-full mt-6">
                <div className="flex flex-grow justify-between items-center flex-col md:flex-row lg:flex-row ">
                    <div className="flex flex-col align-middle max-w-2xl">
                        <span className="text-xl font-semibold italic mb-9 text-red-500">#1 Most Popular Movie This Week</span>
                        <h1 className="text-5xl font-bold leading-tight mb-6">{props.movie.title}</h1>
                        <p className="text-xl mb-4">{props.movie.overview}</p>
                        <div className="flex flex-row gap-4 mt-3">
                        <button className="bg-white hover:text-red-800 transition duration-300 ease-in-out text-red-600 font-bold py-3 px-6 rounded-full">
                            <div className="flex flex-row items-center">
                                <PlayCircle size={24} weight="bold" className="mr-1" />
                                <span>Watch Trailer</span>
                            </div>
                        </button>
                        <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full">Subscribe</button>
                        </div>
                    </div>

                    <div className="flex">
                        <Image className="movie-image bg-black rounded-3xl shadow-xl" src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`} 
                        width={500} height={800}
                        alt={props.movie.title} 
                        />
                    </div>
                </div>
            
            
            </div>
        </header>
    )
}

