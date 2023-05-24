import Image from "next/image";
import { useRouter } from "next/router";
import {
  PlayCircle,
  ArrowLeft,
  Translate,
  UsersThree,
  Star,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import SkeletonHero from "@/components/skeletonHero";

export default function MovieDetails() {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
          setIsNavbarVisible(true); // Show navbar on scroll up
        } else {
          setIsNavbarVisible(false); // Hide navbar on scroll down
        }

        setPrevScrollPos(currentScrollPos);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (movieId) {
      fetch(`/api/getMovieDetails/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching movie details:", error);
          setIsLoading(false);
        });

      fetch(`/api/getMovieVideo/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieVideo(data);
        })
        .catch((error) => {
          console.log("Error fetching movie video:", error);
        });
    }
  }, [movieId]);

  if (isLoading) {
    return (
        <SkeletonHero />
      )
  }

  if (!movieDetails) {
    return <div>Movie not found.</div>;
  }

  let trailerLink = "";
  const trailerData = movieVideo?.results?.find(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.official
  );

  if (trailerData) {
    const trailerKey = trailerData?.key || null;
    trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;
    // You can use the trailerLink wherever you need
  } else {
    console.log("Trailer not found");
  }

  // console.log('movieVideo Object: ',movieVideo)
  //movieDetails = succeed
  return (
    <div>
      <nav
        className={`invisible sm:visible bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-9 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50 ${
          isNavbarVisible
            ? "visible"
            : "transform translate-y-[-100%] transition-all duration-300"
        }`}
      >
        <div className="flex flex-row justify-between">
          <button
            className="hidden sm:flex hover:text-slate-900 hover:bg-white transition duration-300 ease-in-out border-white border text-white font-bold py-3 px-6 rounded-full"
            onClick={() => router.push("/")}
          >
            <div className="flex flex-row items-center">
              <ArrowLeft size={24} weight="bold" className="mr-2" />
              <span>Back</span>
            </div>
          </button>
          <h1 className="text-4xl italic uppercase font-extrabold">irflix</h1>
          <button className="hidden sm:block bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full">
            Subscribe
          </button>

          {/* Mobile-specific navigation */}
          <div className="visible sm:hidden bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-4 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50">
            <div className="flex flex-row justify-between">
              {/* Add your mobile navigation code here */}
              <button
                className="flex hover:text-slate-900 hover:bg-white transition duration-300 ease-in-out border-white border text-white font-bold py-2 px-3 rounded-full"
                onClick={() => router.push("/")}
              >
                <div className="flex flex-row items-center">
                  <ArrowLeft size={24} weight="bold" />
                </div>
              </button>
              <h1 className="text-4xl italic uppercase font-extrabold">
                irflix
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Display other movie details */}
      <div
        className="bg-slate-950 text-white w-full py-24 sm:py-12 xl:h-screen"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${movieDetails.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(100px)",
        }}
      >
        <div
          className="absolute inset-0 bg-slate-950 opacity-90"
          style={{ zIndex: -1 }}
        ></div>
        <div className="container flex mx-auto px-4 h-full mt-6">
          <div className="flex flex-grow justify-between items-center flex-col gap-8 md:flex-row lg:flex-row ">
            <div className="flex flex-col align-middle max-w-2xl">
              <h1 className="text-6xl font-extrabold leading-tight mb-6">
                {movieDetails.title}
              </h1>
              <span className="text-lg italic mb-4 opacity-50">
                Release: {movieDetails.release_date}
              </span>
              <p className="text-xl mb-4">{movieDetails.overview}</p>
              <div className="flex gap-4 justify-between items-start flex-col md:flex-row lg:flex-row ">
                <div className="flex flex-wrap gap-2">
                  {movieDetails.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="py-2 px-4 rounded-full text-white text-opacity-80 font-light border-white border border-opacity-50"
                    >
                      {genre.name}
                    </div>
                  ))}
                  <div className="py-2 px-4 rounded-full text-white text-opacity-80 font-light border-white border border-opacity-50">
                    <div className="flex flex-row items-center">
                      <Translate size={24} weight="light" className="mr-1" />
                      <span className="uppercase">
                        {movieDetails.original_language}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-start md:items-end lg:items-end">
                  <div className="flex flex-row justify-end items-center">
                    <Star
                      size={24}
                      weight="fill"
                      className="mr-2 text-amber-400"
                    />
                    <p className=" text-amber-400 font-bold text-2xl">
                      {movieDetails.vote_average}
                    </p>
                  </div>
                  <div className="flex">
                    <UsersThree
                      size={24}
                      weight="regular"
                      className="mr-2 opacity-50"
                    />
                    <span className="text-lg mb-4 opacity-50">
                      {" "}
                      {movieDetails.popularity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 mt-9">
                <button className="bg-white hover:text-red-800 transition duration-300 ease-in-out text-red-600 font-bold py-3 px-6 rounded-full">
                  <a
                    href={trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
              <Image
                className="movie-image bg-black rounded-3xl shadow-xl"
                src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${movieDetails.poster_path}`}
                width={500}
                height={800}
                alt={movieDetails.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
