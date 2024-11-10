"use client";
import React, { useState } from 'react';
import styles from './header.module.css';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [selectedCategorie, setSelectedCategorie] = useState('');



    const categories = ['Desserts', 'Main Course', 'Salads'];

    const handleSearch = (e: any) => {
        console.log('Searching for:', searchTerm);
        const value = e.target.value;
        setSearchTerm(value);
    };

    const search = () => {
        console.log('Search clicked');
        // Perform search logic here
    };

    const handleTabChange = (tab: string) => {
        console.log(tab);
        setSelectedTab(tab);

    };

    const onAddRecipe = () => {
        console.log("Add Recipe");
    }

    const onCategoryChange = (category:string) => {
        console.log('Selected category:', category);
        setSelectedCategorie(category);
    };

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
                            onChange={handleSearch}
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
