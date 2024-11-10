'use client';
import React from 'react';

export type Recipe = {
    name: string;
    imageUrl: string;  
    category: string[]; 
    ingredients: string[];
    instructions: string; 
    shortDescription: string;
};

const localRecipe: Recipe = {
        name: 'Pasta Bolognese',
        imageUrl: 'https://images.kosher.com/uploads/Pinson-Mushka-One-Pot-Spaghetti-and-Meat-Sauce.webp',
        category: ['Italian', 'Meat', 'Pasta'],
        ingredients: ['Spaghetti pasta', 'Ground beef', 'Tomato sauce', 'Onion', 'Garlic', 'Basil'],
        instructions: '1. Cook the pasta. 2. Sauté the onion and garlic. 3. Add the ground beef and brown. 4. Add the tomato sauce and seasonings. 5. Combine the pasta with the sauce.',
        shortDescription: 'A classic and delicious pasta dish with a rich meat sauce.'
}

export default function Popap(){

    
function close(){
    console.log('Closing');
}

    return(
        <div className={`w-full h-full absolute bg-gray-700 bg-opacity-80 flex flex-row z-50`}>
            <div className=' m-10 bg-white bg-opacity-100 flex-1 absolute left-0 rounded-lg'>
                <button onClick={close}>X</button>
                <div className=''>
                    <h1>{localRecipe.name}</h1>
                    <img src={localRecipe.imageUrl} alt={localRecipe.name} width={200} height={200}/>
                    <p>{localRecipe.instructions}</p>

                </div> 
                <div>
                    <p>{localRecipe.shortDescription}</p>
                </div>
            </div>            
        </div>
    )
}