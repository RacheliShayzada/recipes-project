"use client";
import Header from '@/components/header/header';
import PopUp from '@/components/popup/popup';
import ShowRecipes from '@/components/ShowRecipes/ShowRecipes';
import { getAllRecipes } from '@/services/recipe';
import { Recipe } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { useDisplayStore } from '@/services/providers/DisplayFavoriteProvaider';

function Home() {
  const {favoriteIds} = useDisplayStore((state)=>state)
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
    let filtered = await fetchData();

    if (selectedTab === 'favorites') {

      filtered = filtered.filter(recipe => favoriteIds.includes(recipe._id||''));
    }
    if (selectedCategorie) {
      filtered = filtered.filter(recipe => recipe.category.includes(selectedCategorie));
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

  const handlerDelete = async()=>{
      setRecipes(await fetchData());
  }

  return (
    <div>
      <Header
        handleSearch={handleSearch}
        handleTabClick={handleTabClick}
        handleCategorieClick={handleCategorieClick}
        selectedTab={selectedTab}
        selectedCategory={selectedCategorie} 
      />

      <ShowRecipes recipes={recipes} onDelete={handlerDelete}/>
      <PopUp/>
    </div>
  );
}

export default Home;