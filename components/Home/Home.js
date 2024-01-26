import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import RecipeGenerator from '../RecipeFolder/RecipeGenerator';

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <RecipeGenerator />
    </div>
  );
};

export default Home;
