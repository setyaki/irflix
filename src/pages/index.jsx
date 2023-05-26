import Card from "@/components/card";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import SkeletonHero from "@/components/skeletonHero";
import TopSearch from "@/components/topSearch";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubscribeModal from "@/components/SubscribeModal";

export default function Home() {
  const [data, setData] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [movieDetail, setMovieDetail] = useState();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); //modalsubscribe

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
          setIsNavbarVisible(true); //Show navbar on scroll up
        } else {
          setIsNavbarVisible(false); //Hide navbar on scroll down
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
    fetch("/api/getMovieList")
      .then((result) => result.json())
      .then((values) => {
        setData(values);

        fetch(`/api/getMovieDetails/${values[0].id}`)
          .then((result1) => result1.json())
          .then((value1) => {
            setMovieDetail(value1);
            setIsLoading(false); // Set loading state to false after data is fetched
          });

        fetch(`api/getMovieVideo/${values[0].id}`)
          .then((result2) => result2.json())
          .then((value2) => {
            setMovieVideo(value2);
          });
      });
  }, []);

  return (
    <>
      <nav
        className={`invisible sm:visible bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-9 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50 ${
          isNavbarVisible
            ? "visible transition-all duration-400"
            : "transform translate-y-[-100%] transition-all duration-300"
        }`}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl italic uppercase font-extrabold">irflix</h1>

          <TopSearch />

          <button className="hidden sm:block bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full"
          onClick={() => setIsModalOpen(true)}>
            Subscribe
          </button>

          {/* Mobile-specific navigation */}
          <div className="visible sm:hidden bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-4 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50">
            <div className="flex flex-row justify-between">
              {/* Add your mobile navigation code here */}
              <h1 className="text-4xl italic uppercase font-extrabold">
                irflix
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {!isLoading ? (
        <>
          {!movieDetail ? (
            <SkeletonHero />
          ) : (
            <Hero data={movieDetail} video={movieVideo} />
          )}
          
          <section className="bg-slate-900 py-24">
          
            <div className="container mx-auto px-6">
              <div className="inline">
                <h2 className="text-white text-3xl font-bold border-l-4 border-red-600 pl-2 leading-tight mb-9">
                  Popular Movies This Week
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
                {data.map((movie, i) => (
                  <Link
                    key={i}
                    href={{
                      pathname: "/movie/[movieId]",
                      query: { movieId: movie.id },
                    }}
                  >
                    <Card key={i} movie={movie} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <SkeletonHero />
      )}

      <Footer />

      {isModalOpen && (
        <SubscribeModal onClose={() => setIsModalOpen(false)} />
        )}
    </>
  );
}
