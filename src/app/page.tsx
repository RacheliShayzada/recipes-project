"use client";

import ShowRecipes from '@/components/ShowRecipes/ShowRecipes';
import { getAllRecipes } from '@/services/recipe';
import { Recipe } from '@/types/types';
import React, { useEffect, useState } from 'react';

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
    <div>
      
    </div>
  );
}

export default Home;
