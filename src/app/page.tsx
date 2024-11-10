import ShowRecipes from '@/components/ShowRecipes/ShowRecipes';
import React from 'react';
import { Recipe } from '@/types/types'

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Bolognese',
    imageUrl: 'https://example.com/pasta_bolognese.jpg',
    category: ['Italian', 'Meat', 'Pasta'],
    ingredients: ['Spaghetti pasta', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Basil'],
    instructions: '1. Cook the pasta. 2. Sauté the onion and garlic. 3. Add the ground beef and brown. 4. Add the tomato sauce and seasonings. 5. Combine the pasta with the sauce.',
    shortDescription: 'A classic and delicious pasta dish with a rich meat sauce.'
  },
  {
    id: '2',
    name: 'Chocolate Chip Cookies',
    imageUrl: 'https://example.com/chocolate_chip_cookie.jpg',
    category: ['Desserts', 'Chocolate', 'Baking'],
    ingredients: ['Flour', 'Sugar', 'Chocolate chips', 'Eggs', 'Butter', 'Baking powder', 'Vanilla'],
    instructions: '1. Preheat oven. 2. Combine dry ingredients. 3. Combine wet ingredients. 4. Combine both mixtures. 5. Bake.',
    shortDescription: 'Soft and chewy cookies with plenty of chocolate chips.'
  },
  {
    id: '3',
    name: 'Greek Salad',
    imageUrl: 'https://example.com/greek_salad.jpg',
    category: ['Salad', 'Mediterranean', 'Vegetables'],
    ingredients: ['Tomatoes', 'Cucumber', 'Pepper', 'Red onion', 'Black olives', 'Feta cheese', 'Olive oil', 'Lemon'],
    instructions: '1. Cut the vegetables into cubes. 2. Combine all ingredients in a bowl.',
    shortDescription: 'A fresh and tasty salad with Mediterranean flavors.'
  },
];

function Home() {
  return (
    <div>
      <h1>Recipe List</h1>
      <ShowRecipes recipes={recipes}/>
    </div>
  );
}

export default Home;