"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCategorys } from '@/services/category'
import styles from './header.module.css';
import Link from 'next/link';

type HeaderProps = {
    handleCategorieClick: (category: string) => void;
    handleTabClick: (tab: string) => void;
    handleSearch: (term: string) => void;
    selectedTab: string;
    selectedCategory: string;
};

const Header = ({ handleCategorieClick, handleTabClick, handleSearch, selectedTab, selectedCategory }: HeaderProps) => {
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


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <h1 className={styles.header_text}><strong>Recipes</strong></h1>
                    <select
                        onChange={(e) => onCategoryChange(e.target.value)}
                        value={selectedCategory}
                        className={styles.customSelect}
                    >
                        <option value="">All the recipes</option>
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
                        <button onClick={search} className={styles.searchIconButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#9b72d1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width="20"
                                height="20"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                    <Link onClick={onAddRecipe} className={styles.customButton} href='/add-recipe'>
                        Add New
                    </Link>
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
