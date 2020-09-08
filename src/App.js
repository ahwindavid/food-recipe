import React, { useEffect, useState } from "react";
import Recipe from './recipe';
import "./App.css";

function App() {
  const APP_ID = "d2faeec9";
  const APP_KEYS = "fd6b86053e55b3515ef21b3c868b0e1e";



  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] =  useState('chicken');


  useEffect(() => {
    getRecipeAw();
  }, [query]);


  async function getRecipeAw(){
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits)
  } 


const updateSearch = event => {
  setSearch(event.target.value)
}
const getSearch = (event) => {
  event.preventDefault();
  setQuery(search);
  setSearch('');

}
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"  value = {search} onChange={updateSearch}/>
        <button
          className="search-button" type = 'submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}/>
      ))}
      </div>
      
    </div>
  );
}

export default App;
