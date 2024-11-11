export type Recipe = {
    _id: string;                
    name: string;           
    imageUrl: string; 
    category: string[];   
    ingredients: string[];  
    instructions: string;    
    shortDescription: string; 
  };


  export type Category={
    id: string;   
    name: string; 
  }

       