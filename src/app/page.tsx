import React from 'react';
import RecipesCard, { Recipe } from '@/components/recipesCard/RecipesCard';

const sampleRecipe: Recipe = {
  name: "Spaghetti Bolognese",
  imageUrl: "https://example.com/spaghetti.jpg",
  category: ["Italian", "Pasta"],
  ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic"],
  instructions: "Cook spaghetti. Sauté beef with onions and garlic. Add tomato sauce. Combine and serve.",
  shortDescription: "A classic Italian pasta dish with rich meat sauce.",
};

function Home() {
  return (
    <div>
      <h1>Recipe List</h1>
      <RecipesCard recipe={sampleRecipe} isFavorite={true} />
    </div>
  );
}

export default Home;
