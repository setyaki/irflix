import Image from "next/image"

export default function Card (props) {
    const imageURL = `${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`;
    console.log("Image URL:", imageURL);
    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <Image className="movie-image" src={`${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL}/${props.movie.poster_path}`} 
            width={500} height={800}
            alt={props.movie.title} 
                />
            console.log(${process.env.NEXT_PUBLIC_REACT_APP_BASEIMGURL})
            <h3 className="text-blue-600 font-bold mb-4">{props.movie.title}</h3>
            <p className=" text-blue-800">Release: {props.movie.release_date}</p>
            <p className=" text-blue-800">Vote Rating: {props.movie.vote_average}</p>
        </div>
    )
}