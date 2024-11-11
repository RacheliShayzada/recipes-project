"use client";

import Header from '@/components/header/header';
import ShowRecipes from '@/components/ShowRecipes/ShowRecipes';
import { getAllRecipes, getRecipeByCategory, getRecipeByIds } from '@/services/recipe';
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
      return (res as unknown as { documents: Recipe[] }).documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      const res: any = await fetchData();
      console.log(res)
      setRecipes(res || []);
    };
    fetchAndSetRecipes();
  }, []);

  const filteredRecipes = async () => {
    let filtered:Recipe[]  =  [];

    if (selectedTab === 'favorites') {
      const favoriteRecipes: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      filtered = await getRecipeByIds(favoriteRecipes);
      if(selectedCategorie)
         filtered = filtered.filter((recipe) => recipe.category.includes(selectedCategorie));
    }else{
      if(selectedCategorie)
        filtered = await getRecipeByCategory(selectedCategorie);
    }
    if(selectedTab !== 'favorites' && !selectedCategorie ){
      filtered = await fetchData();
    }
    if (searchTerm) {
      filtered = filtered.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <Header
        handleSearch={handleSearch}
        handleTabClick={handleTabClick}
        handleCategorieClick={handleCategorieClick}
        selectedTab={selectedTab}
      />
      <ShowRecipes recipes={recipes} />
    </div>
  );
}

export default Home;