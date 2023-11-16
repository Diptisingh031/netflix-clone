import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss';
import { BiPlay } from 'react-icons/bi';
import {AiOutlinePlus} from "react-icons/ai";

const apiKey = '973ec15b';
const apiUrl = 'https://www.omdbapi.com/';
const movieId = 'tt3896198';

const Card = ({ img, title }) => (
  <div className='card'>
    <img src={img} alt={title} />
    <p>{title}</p>
  </div>
);

const Banner = ({ img, title, genre, ratings }) => (
  <div className='banner'>
    <img src={img} alt="Banner" />
    <div className='banner-content'>
      <p>Title: {title}</p>
      <p>Genre: {genre}</p>
      <p>Ratings: {ratings}</p>
    </div>

    <div>
      <button> <BiPlay/>  Play </button>
      <button>My List <AiOutlinePlus /> </button>
    </div>

  </div>
);

const Row = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}?i=${movieId}&apikey=${apiKey}&s=${category}`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching data from OMDB API:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {movies.map((item) => (
          <Card key={item.imdbID} img={item.Poster} title={item.Title} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [bannerData, setBannerData] = useState({
    img: '',
    title: '',
    genre: '',
    ratings: '',
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${apiUrl}?i=${movieId}&apikey=${apiKey}&s=popular`);
        const popularMovie = response.data.Search && response.data.Search[0];
        if (popularMovie) {
          setBannerData({
            img: popularMovie.Poster,
            title: popularMovie.Title,
            genre: popularMovie.Genre,
            ratings: popularMovie.imdbRating,
          });
        }
      } catch (error) {
        console.error('Error fetching data for banner from OMDB API:', error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <section className='home'>
      <Banner {...bannerData} />
      <Row title={'Movies'} category={'movie'} />
      <Row title={'TV Shows'} category={'series'} />
      <Row title={'Recently Added'} category={'new'} />
      <Row title={'My List'} category={'top'} />
    </section>
  );
};

export default Home;
