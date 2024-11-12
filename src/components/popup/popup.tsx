'use client'

import React, { useState } from 'react';
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'
import styles from '../popup/Popup.module.css';
import Favorite from '../favorite/Favorite';

export default function PopUp(){
    const { isModalOpen, selectedRecipe, closeModal } = useDisplayStore((state) => state,)
    const [favorite, setFavorite] = useState<boolean>(false);

    return(
        <>
        { isModalOpen && (selectedRecipe !== null) 
        ? 
        (
        <div className={`w-screen h-screen fixed inset-0 z-50 bg-gray-700 bg-opacity-60 flex justify-center items-center`}>
            <div className={styles.customScroll}>
                <div className='flex flex-row items-center justify-between'>
                  <button onClick={()=> void closeModal()} className=''>X</button>
                  <h1 className='text-2xl m-4'>{selectedRecipe.name}</h1>
                  <Favorite recipeId={selectedRecipe._id} />
                </div>

                <div className='flex justify-between items-start space-x-8'>
                  <div>
                    <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} width={200} height={200} className='rounded-lg'/>
                    <p className={styles.category}>
                      {Array.isArray(selectedRecipe.category) 
                        ? selectedRecipe.category.join(', ') 
                        : selectedRecipe.category}
                      </p>                  
                  </div>
                    <div className='mr-8'>
                        <h3 className='font-bold'>Ingredients:</h3>
                          <ul>
                            {selectedRecipe.ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>

                    </div>
                </div> 
                <div className='mt-4'>
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