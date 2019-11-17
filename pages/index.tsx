import React from 'react';
import Head from 'next/head';
import HomeLayout from '../layouts/home';

const Home = props => {
  return (
    <>
      <Head>
        <title>Kolby Sisk - An interactive portfolio featuring Koltron</title>
      </Head>
      <HomeLayout />
    </>
  );
};

export default Home;
