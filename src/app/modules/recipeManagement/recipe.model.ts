export interface Recipe {
  recipe_id: number;
  recipe_name: string;
  recipe_description: string;
  ingrediants:Ingrediants[];
  }
  
  export interface Ingrediants {
    ingredient_name: string;
    ingredient_sequence: number;
    ingredient_type: string;
    ingredient_steering_type: string;
    ingredient_cooking_time: string;
  }
  