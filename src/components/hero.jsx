import Image from "next/image"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PlayCircle } from "@phosphor-icons/react";

export default function Hero ({data, video}) {
    let trailerLink = "";
    const trailerData = video.results && video.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official
      );
      
      if (trailerData) {
        const trailerKey = trailerData?.key || null;
        trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;
        // use the trailerLink wherever you need
      } else {
        console.log('Trailer not found');
      }
// console.log("props", data)
    return (
        <header className="bg-slate-950 text-white py-24 h-screen ">
            <div className="container flex mx-auto px-4 h-full mt-6">
                <div className="flex flex-grow justify-between items-center flex-col md:flex-row lg:flex-row ">
                    <div className="flex flex-col align-middle max-w-2xl">
                        <span className="text-xl font-semibold italic mb-9 text-red-500">#1 Most Popular Movie This Week</span>
                        <h1 className="text-6xl font-extrabold leading-tight mb-6">{data.title || <Skeleton/>}</h1>
                        <p className="text-xl mb-4">{data.overview || <Skeleton count={10} />}</p>
                        <div className="flex flex-wrap gap-2">
                            {data.genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className= "py-2 px-4 rounded-full text-white text-opacity-80 font-light border-white border border-opacity-50"

                                >
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row gap-4 mt-9">
                        <button className="bg-white hover:text-red-800 transition duration-300 ease-in-out text-red-600 font-bold py-3 px-6 rounded-full">
                            <a href={trailerLink} target="_blank" rel="noopener noreferrer">
                                <div className="flex flex-row items-center">
                                    <PlayCircle size={24} weight="bold" className="mr-1" />
                                    <span>Watch Trailer</span>
                                </div>
                            </a>
                        </button>
                        <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full">Subscribe</button>
                        </div>
                    </div>

                    <div className="flex">
                        <Image className="movie-image bg-black rounded-3xl shadow-xl" src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${data.poster_path}`} 
                        width={500} height={800}
                        alt={data.title} 
                        />

                    </div>
                </div>
            
            
            </div>
        </header>
    )
}

