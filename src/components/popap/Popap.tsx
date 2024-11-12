'use client';
import React from 'react';
import { Recipe } from '@/types/types'
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'

export const localRecipe: Recipe = {
    _id: '1',
    name: 'Pasta Bolognese',
    imageUrl: 'https://images.kosher.com/uploads/Pinson-Mushka-One-Pot-Spaghetti-and-Meat-Sauce.webp',
    category: ['Italian', 'Meat', 'Pasta'],
    ingredients: ['Spaghetti pasta', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Basil'],
    instructions: '1. Cook the pasta. 2. Sauté the onion and garlic. 3. Add the ground beef and brown. 4. Add the tomato sauce and seasonings. 5. Combine the pasta with the sauce.',
    shortDescription: 'A classic and delicious pasta dish with a rich meat sauce.'
};

export default function Popap(){
    const { isModalOpen, selectedRecipe, closeModal } = useDisplayStore((state) => state,)


    return(
        <>
        { isModalOpen && (selectedRecipe !== null) 
        ? 
        (
        <div className={`w-screen h-screen fixed inset-0 z-50 bg-gray-700 bg-opacity-60`}>
            <div id='div2' className='absolute top-0 right-0 w-1/3 h-full bg-white rounded-lg p-4'>
                <button onClick={()=> void closeModal()} className=''>X</button>
                <div className='flex flex-row h-1/3'>
                    <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} width={200} height={200} className='rounded-lg'/>
                    <div>
                        <h1>{selectedRecipe.name}</h1>
                        <p>{selectedRecipe.category}</p>
                        <p>star</p>
                        <p>{selectedRecipe.ingredients}</p>
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