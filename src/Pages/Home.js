import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import ListStories from '../components/ListStories';
import { isAuthenticated } from "../lib/isauth"
import { useEffect } from 'react';

export default function Home() {

  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  console.log(isAuth);

 useEffect(()=>{
  if(isAuth === false){
    navigate('/login');
  }
 })

    const theme = createTheme();

  return (

    <ThemeProvider theme={theme}>
      <NavBar />
      <ListStories />
      </ThemeProvider>
)
}
