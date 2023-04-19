import Card from "@/components/card";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import TopSearch from "@/components/topSearch";
import { useEffect, useState } from 'react'

export default function Home() {
    const [data, setData] = useState([])
    const [firstData, setFirstData] = useState([])
    useEffect(() => {
      fetch(`/api/getMovieList`)
      .then((result) => result.json())
      .then((data) => {
        setData(data)
        setFirstData(data[0])
    })
    
    },[])
  
    return (<>
    {/* code here */}
    <nav className="invisible sm:visible bg-gradient-to-b from-slate-950 to-slate-950/0 text-white px-9 pb-9 pt-6 w-full h-auto fixed top-0 left-0 right-0 z-50">
        <div className="flex flex-row justify-between">
            <h1 className=" text-4xl italic uppercase font-extrabold">irflix</h1>
            <TopSearch/>
            <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-full">Subscribe</button>
        </div>

        </nav>

        <Hero key={0} movie={firstData}/>
        
        <section className=" bg-slate-900 py-24">
            <div className="container mx-auto px-6">
                <div className="inline">
                    
                    <h2 className="text-white text-3xl font-bold border-l-4 border-red-600 pl-2 leading-tight mb-9"> Popular Movies This Week</h2>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {data.map((movie,i) => {
                return (
                    <Card key={i} movie={movie}/>
                )
            })}
            </div>
            </div>
        </section>
        
        <Footer/>
    </>)

} 