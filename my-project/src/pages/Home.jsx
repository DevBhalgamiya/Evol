import React from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/Upload';

const Home = () => {
  return (
    <div className='bg-white min-h-screen relative'>
      <Navbar />
      <Upload />
    </div>
  );
}

export default Home;
