"use client";

import React, { useEffect, useState } from 'react';
import { Recipe } from '@/types/types'
import ShowRecipes from '@/components/ShowRecipes/ShowRecipes';
import { getAllRecipes } from '@/services/recipe';

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
  const [recipes, setRecipes] = useState<Recipe[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all'); 
  const [selectedCategorie, setSelectedCategorie] = useState('');

  const fetchData = async () => {
    try {
      const res = await getAllRecipes();
      return res;  
    } catch (error) {
      console.error(error);
      return [];  
    }
  };

  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      const res = await fetchData();
      setRecipes(res || []);  
    };
    fetchAndSetRecipes();
  }, []);

  const filteredRecipes = async () => {
    const allRecipes = await fetchData();  
    let filtered = allRecipes || [];  

    if (searchTerm) {
      filtered = filtered.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategorie) {
      filtered = filtered.filter((recipe) => recipe.category.includes(selectedCategorie));
    }
    if (selectedTab === 'favorites') {
      const favoriteRecipes: string[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 
      filtered = filtered.filter((recipe) => favoriteRecipes.includes(recipe.id));
    }

    setRecipes(filtered); 
  };

  useEffect(() => {
    filteredRecipes();  
  }, [searchTerm, selectedCategorie, selectedTab]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);  
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);  
  };

  const handleCategorieClick = (categorie: string) => {
    setSelectedCategorie(categorie);  
  };

  return (
    <div className='m-10'>
      <h1>Recipe List</h1>
      <ShowRecipes recipes={recipes}/>
    </div>
  );
}

export default Home;