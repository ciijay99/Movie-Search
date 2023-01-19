import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Box,
  Typography,
  Button,
  TextField,
  CardContent,
} from '@mui/material';
import Image from 'mui-image';

const API_KEY = '0eab58b7590265e553d54f047d3b08a7';

const Movie = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}&page=${page}`
      );
      setMovieData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      padding='20'
      margin='40px'
      width='100%'
    >
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontWeight: '800',
        }}
      >
        Movie Search
      </Typography>
      <Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
        <form
          display='flex'
          gap='2rem'
          onSubmit={handleSearch}
        >
          <TextField
            id='fullwidth'
            label='Search For A Movie'
            variant='outlined'
            type='search'
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            sx={{ width: '40rem', mr: '0.5rem' }}
          />
          <Button
            sx={{
              p: '16.5px 20px',
              backgroundColor: '#E6F5FF',
              color: '#393D40',
              '&:hover': {
                backgroundColor: '#333666',
                color: '#E6F5FF',
              },
            }}
            type='submit'
          >
            Search
          </Button>
        </form>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          '@media (max-width:1024px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridColumnGap: '1rem',
          },
          '@media (max-width:767px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {movieData.map((movie) => (
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 500,
              margin: '20px auto',
              backgroundColor: 'black',
              borderRadius: '10px',
              width: '300px',
            }}
            key={movie.id}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              height='300px'
              width='300px'
              fit='fill'
              duration={0}
              showLoading={true}
              errorIcon={true}
              distance=''
              bgColor=''
            />
            <CardContent
              sx={{
                width: '290px',
                textAlign: 'center',
                backgroundColor: 'black',
              }}
            >
              <Typography
                gutterBottom
                variant='h6'
                component='div'
                color='white'
                sx={{ fontWeight: '800' }}
              >
                {movie.title}
              </Typography>
              <Typography color='white'>{movie.release_date}</Typography>
              <Typography color='white'>{movie.vote_average}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {totalPages > 0 && (
        <Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
          <Button
            disabled={page === 1}
            onClick={(e) => {
              if (page > 1) {
                setPage((prevPage) => prevPage - 1);
                handleSearch(e);
                console.log(page);
              }
            }}
          >
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button
            disabled={page === totalPages || isLoading}
            onClick={(e) => {
              setPage((prevPage) => prevPage + 1);
              handleSearch(e);
            }}
          >
            {console.log(page)}
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Movie;
