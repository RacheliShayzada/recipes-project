export type Recipe = {
    id?: string;                // מ��הה מיו��ד למתכו��
    name: string;               // שם המתכון
    imageUrl: string;           // URL של התמונה
    category: string[];           // קטגוריות של המתכון
    ingredients: string[];      // רשימת מצרכים (מחרוזות)
    instructions: string;       // הוראות הכנה
    shortDescription: string;   // תאור קצר של המתכון
  };


  export type Category={
    id?: string;                // מ��הה מיו��ד למתכו��
    name: string;             // שם הק����ו��י��
  }

       