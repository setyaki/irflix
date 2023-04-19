import Image from "next/image"
import { Star, StarHalf } from "@phosphor-icons/react";

export default function Card (props) {
    const imageURL = `${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`;
    console.log("Image URL:", imageURL);
    let stars=[...Array(5)]
    const rating=props.movie.vote_average/2;

    return (
        <div className="flex flex-col bg-slate-950 shadow-xl rounded-2xl hover:shadow-3xl hover:scale-105 transition duration-300 ease-in-out">
            <Image className="movie-image bg-black rounded-2xl" src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`} 
            width={500} height={800}
            alt={props.movie.title} 
                />
            {console.log(`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}`)}
            <div className="flex flex-col flex-grow p-6 justify-between">
                <h2 className="text-2xl text-white font-bold mb-4">{props.movie.title}</h2>
                
                <div className="flex flex-row justify-between">
                    <div className="flex-col justify-start">
                        <p className=" text-slate-400 text-md">Release</p>
                        <p className=" text-slate-400 font-bold text-xl mt-0">{props.movie.release_date}</p>
                    </div>
                    <div className="flex-col justify-end">
                        <div className="flex flex-row text-amber-400 justify-end space-x-1">
                            {
                                stars.map((val,i) => {
                                    if(rating-i>=1) return (<Star size={18} weight="fill" />)
                                    if(rating-i>=0) return (<StarHalf size={18} weight="fill" />)
                                    return (<Star size={18} weight="bold" />)
                                })
                            }
                        </div>
                        <div className="flex justify-end">
                            <p className=" text-amber-400 font-bold text-2xl mt-0 justify-end">{props.movie.vote_average/2}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}