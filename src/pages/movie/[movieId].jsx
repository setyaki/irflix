import Image from "next/image"
import { useRouter } from 'next/router';
import { PlayCircle, ArrowLeft, Translate } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';

export default function MovieDetails() {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movieId) {
      fetch(`/api/getMovieDetails/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching movie details:', error);
          setIsLoading(false);
        });

      fetch(`/api/getMovieVideo/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieVideo(data);
        })
        .catch((error) => {
          console.log('Error fetching movie video:', error);
        });
    }
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>Movie not found.</div>;
  }

  let trailerLink = "";
  const trailerData = movieVideo?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official
  );

  if (trailerData) {
    const trailerKey = trailerData?.key || null;
    trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;
    // You can use the trailerLink wherever you need
  } else {
    console.log('Trailer not found');
  }

  // console.log('movieVideo Object: ',movieVideo)
  //movieDetails = succeed
  return (
    <div>
      <nav className="invisible sm:visible bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-9 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50">
                <div className="flex flex-row justify-between">
                    <button className="hover:text-slate-900 hover:bg-white transition duration-300 ease-in-out border-white border text-white font-bold py-3 px-6 rounded-full" onClick={() => router.push('/')}>
                        <div className="flex flex-row items-center">
                          <ArrowLeft size={24} weight="bold" className="mr-2"/>
                          <span>Back</span>
                        </div>
                    </button>
                    <h1 className="text-4xl italic uppercase font-extrabold">irflix</h1>
                    <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full">Subscribe</button>
                </div>
            </nav>
      {/* Display other movie details */}
      <div 
        className="bg-slate-950 text-white py-24 h-screen"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${movieDetails.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(100px)',
        }}>
          <div
          className="absolute inset-0 bg-slate-950 opacity-90"
          style={{ zIndex: -1 }}
          ></div>
            <div className="container flex mx-auto px-4 h-full mt-6">
                <div className="flex flex-grow justify-between items-center flex-col md:flex-row lg:flex-row ">
                    <div className="flex flex-col align-middle max-w-2xl">
                        <h1 className="text-6xl font-extrabold leading-tight mb-6">{movieDetails.title}</h1>
                        <p className="text-xl mb-4">{movieDetails.overview}</p>
                        <div className="flex flex-wrap gap-2">
                            {movieDetails.genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className= "py-2 px-4 rounded-full text-white text-opacity-80 font-light border-white border border-opacity-50">
                                    {genre.name}
                                </div> 
                            ))}
                            <div className= "py-2 px-4 rounded-full text-white text-opacity-80 font-light border-white border border-opacity-50">
                              <div className="flex flex-row items-center">
                                    <Translate size={24} weight="light" className="mr-1" />
                                    <span className="uppercase">{movieDetails.original_language}</span>
                              </div>   
                              
                            </div> 
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
                        {/* ....display beside button trailer */}
                        </div>
                    </div>

                    <div className="flex">
                        <Image className="movie-image bg-black rounded-3xl shadow-xl" src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${movieDetails.poster_path}`} 
                        width={500} height={800}
                        alt={movieDetails.title} 
                        />

                    </div>
                </div>
            
            
            </div>
        </div>
    </div>
  );
}
