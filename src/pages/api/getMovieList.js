import axios from "axios"


export default async function handler(req, res) {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}`)
    
    // console.log(movie.data)
    res.status(200).json(movie.data.results)
}


