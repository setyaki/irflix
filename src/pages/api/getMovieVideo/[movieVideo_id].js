import axios from "axios"

export default async function handler(req, res) {
    const movieVideo_id = req.query.movieVideo_id;
    const movieVideo = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${movieVideo_id}/videos?api_key=${process.env.REACT_APP_APIKEY}`)
    
    console.log(movieVideo.data)
    res.status(200).json(movieVideo.data)
}