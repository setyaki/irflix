import axios from "axios"

const getMovieList = async() => {
    const movie = await axios.get(`${process.env.local.REACT_APP_BASEURL}/`)
    return
}

const searchMovie = async(q) => {
    const search = await axios.get(q)
    return
}