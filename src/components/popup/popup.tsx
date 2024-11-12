'use client'

import React, { useState } from 'react';
import { Recipe } from '@/types/types'
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'

export default function PopUp(){
    const { isModalOpen, selectedRecipe, closeModal } = useDisplayStore((state) => state,)
    const [favorite, setFavorite] = useState<boolean>(false);

    
  const toggleFavoriteInLocalStorage = () => {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (selectedRecipe !== null) {
      const updatedFavorites = favorite
      ? favorites.filter(id => id !== selectedRecipe._id) 
      : [...favorites, selectedRecipe._id]; 
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorite(!favorite); 
    }
    
  };

  const handleFavoriteClick = () => {
    toggleFavoriteInLocalStorage();
  };

    return(
        <>
        { isModalOpen && (selectedRecipe !== null) 
        ? 
        (
        <div className={`w-screen h-screen fixed inset-0 z-50 bg-gray-700 bg-opacity-60 flex justify-center items-center`}>
            <div id='div2' className=' w-2/3 h-2/3 bg-white rounded-lg p-4 text-center'>
                <button onClick={()=> void closeModal()} className=''>X</button>
                <h1 className='text-2xl m-4'>{selectedRecipe.name}</h1>

                <div className=''>
                    <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} width={200} height={200} className='rounded-lg'/>
                    <div>
                        <p className=''>{selectedRecipe.category.join(', ')}</p>
                        {favorite ? '🌟' : '⭐'}

                        <h3 className='font-bold'>Ingredients:</h3>
                          <ul>
                            {selectedRecipe.ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>

                    </div>
                    
                </div> 
                <div>
                     <p>{selectedRecipe.instructions}</p>
                </div>
            </div>            
        </div>
        ) 
        : 
        (<p></p>)
        }
        </>

        
    )
}