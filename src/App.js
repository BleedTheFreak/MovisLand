import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import './App.css'
import searchIcon from './search.svg'
const API_URL = 'https://www.omdbapi.com?apikey=4a61aa'

const App = () => {
	const [movies, setMovies] = useState([])
	const [searchTitle, setSearchTitle] = useState('')

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json()
		setMovies(data.Search)
	}

	useEffect(() => {
		setMovies()
	}, [])

	return (
		<div className="app">
			<h1>MovieLand</h1>
			<div className="search">
				<input
					placeholder="Search for movie"
					value={searchTitle}
					onChange={(e) => setSearchTitle(e.target.value)}
				/>
				<img
					src={searchIcon}
					alt="Search Icon"
					onClick={() => searchMovies(searchTitle)}
				/>
			</div>
			{
				movies?.length > 0
					?
					(
						<div className="container">
							{movies.map((movie) => <MovieCard movie={movie} />)}
						</div>
					)
					:
					<div className="empty">
						<h2>No movies or series found 🥲.</h2>
					</div>
			}
		</div>
	)
}

export default App