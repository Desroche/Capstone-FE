import React, { useState } from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import './RecipeSearch.css';
import useProfileData from '../../hooks/useProfileData';

const RecipeGenerator = () => {
    const { profileData, loading, error } = useProfileData();
    const [selectedDiet, setSelectedDiet] = useState('');
    const [numberOfRecipes, setNumberOfRecipes] = useState(1);
    const [recipeData, setRecipeData] = useState(null);
    const [fetchError, setFetchError] = useState('');

    const userDietRestrictions = profileData && profileData.dietaryRestrictions ? profileData.dietaryRestrictions : [];

    const handleSearch = () => {
        setFetchError('');
        const url = `/api/searchRecipes?diet=${selectedDiet}&number=${numberOfRecipes}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setRecipeData(data))
            .catch(fetchError => {
                console.error('Error fetching data:', fetchError);
                setFetchError('Error fetching data. Please try again.');
            });
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipe-search-main-container">
      <h1>Recipe App</h1>
      <form onSubmit={handleSubmit} className="search-container">
        <label>
          Diet Restriction:
          <select
            value={selectedDiet}
            onChange={e => setSelectedDiet(e.target.value)}
            disabled={!userDietRestrictions.length}
          >
            {userDietRestrictions.map((restriction, index) => (
              <option key={index} value={restriction}>{restriction}</option>
            ))}
          </select>
        </label>
        <label>
          Number of Recipes:
          <select
            value={numberOfRecipes}
            onChange={e => setNumberOfRecipes(e.target.value)}
          >
            {[...Array(10).keys()].map(n => (
              <option key={n} value={n + 1}>{n + 1}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="searchButton">Search</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className='recipe-container'>
        {fetchError && <p className="error-message">{fetchError}</p>}
        {recipeData && recipeData.results ? (
          <div>
            {recipeData.results.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p>Waiting for selection</p>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
