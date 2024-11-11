"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCategorys } from '@/services/category'
import styles from './header.module.css';

type HeaderProps = {
    handleCategorieClick: any,
    handleTabClick: any,
    handleSearch: any,
    selectedTab:string
}

const Header = ({ handleCategorieClick, handleTabClick, handleSearch, selectedTab }: HeaderProps) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categoryData = await getAllCategorys();
            setCategories(categoryData.map((categorie) => categorie.name));
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }, []);

    const handleSearchChange = (e: any) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const search = () => { handleSearch(searchTerm); };

    const handleTabChange = (tab: string) => { handleTabClick(tab); };

    const onAddRecipe = () => { router.push('/add-recipe'); }

    const onCategoryChange = (category: string) => { handleCategorieClick(category); };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_top}>
                    <h1>Recipes</h1>

                    <div className={styles.search_filter}>
                        <select onChange={(e) => onCategoryChange(e.target.value)}>
                            <option value="">Pick a Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button onClick={search} className={styles.add_recipe_button}>
                            search
                        </button>
                    </div>

                    <button onClick={onAddRecipe} className={styles.add_recipe_button}>
                        Add Recipe
                    </button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`tab_button ${selectedTab === 'all' ? 'active' : ''}`}
                        onClick={() => handleTabChange('all')}>
                        All Recipes
                    </button>
                    <button
                        className={`tab_button ${selectedTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => handleTabChange('favorites')}>
                        Favorites
                    </button>
                </div>
            </header>

        </>


    );
};

export default Header;
