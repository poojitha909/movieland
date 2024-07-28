import React from 'react'
import {useState, useEffect } from "react"
import "./index.css"

import MovieCard from "./components/MovieCard"
import SearchIcom from "./search.svg"

const MOVIE_URL = "http://www.omdbapi.com?apikey=f6cf1dc6" 

const App = () => {

    const [movies,setmovie] = useState([])
    const [searchterm,setterm] = useState("")


    const searchMovie = async (title)=>{
        const res = await fetch(`${MOVIE_URL}&s=${title}`)
        const data = await res.json();
        setmovie(data.Search)
        console.log(data)

    }

    useEffect(()=>{
        searchMovie('batman')
    },[])


  return (
    <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
            <input 
            placeholder="search"
            value={searchterm}
            onChange = {(e) => setterm(e.target.value)}/>
            <img
            src ={SearchIcom}
            alt ="logo"
            onClick={()=>searchMovie(searchterm)}
            />
        </div>
        {
            movies?.length > 0 
            ?
            (
                <div className="container">
                   { movies.map((movie) => 
                    (
                        <MovieCard movie = { movie } />
                    ))
                }
                </div>

            ):
            <div className="empty">
                 <h2>Movies are found</h2>

            </div>
        }
    </div>
  )
}

export default App