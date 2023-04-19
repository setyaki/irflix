import axios from "axios"


export default async function handler(req, res) {
    const movie_id = req.query.movie_id;
    const movieDetail = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${movie_id}?api_key=${process.env.REACT_APP_APIKEY}`)
    
    console.log(movieDetail.data)
    res.status(200).json(movieDetail.data)
}