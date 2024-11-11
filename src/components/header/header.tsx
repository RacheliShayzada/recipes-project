"use client";
import React, { useState } from 'react';
import styles from './header.module.css';

type HeaderProps = {
    handleCategorieClick: (category: string) => void;
    handleTabClick: (tab: string) => void;
    handleSearch: (term: string) => void;
    selectedTab: string;
    selectedCategory: string;
};

const Header = ({ handleCategorieClick, handleTabClick, handleSearch, selectedTab, selectedCategory }: HeaderProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['Desserts', 'Main Course', 'Salads'];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const search = () => {
        handleSearch(searchTerm);
    };

    const handleTabChange = (tab: string) => {
        handleTabClick(tab);
    };

    const onCategoryChange = (category: string) => {
        handleCategorieClick(category);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_top}>
                    <h1 className={styles.header_text}><strong>Recipes</strong></h1>
                    <select
                            onChange={(e) => onCategoryChange(e.target.value)}
                            value={selectedCategory}
                            className={styles.customSelect}
                        >
                            <option value="">Pick a Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    <div className={styles.search_filter}>

                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.customInput}
                        />
                        <button onClick={search} className={styles.customButton}>
                            Search
                        </button>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab_button} ${selectedTab === 'all' ? styles.active : ''}`}
                        onClick={() => handleTabChange('all')}
                    >
                        All Recipes
                    </button>
                    <button
                        className={`${styles.tab_button} ${selectedTab === 'favorites' ? styles.active : ''}`}
                        onClick={() => handleTabChange('favorites')}
                    >
                        Favorites
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
