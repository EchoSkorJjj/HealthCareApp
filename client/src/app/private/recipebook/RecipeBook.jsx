import axios from "axios";
import react, { useState} from 'react';

export default function RecipeBook() {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            const response = await axios.get(`${baseUrl}/api/account/getRecipeBook`);
            setRecipes(response.data);
        };
        fetchRecipes();
    }, []);
    
    return (
        <div>
        <h1>Recipe Book</h1>
        <ul>
            {/* {recipes.map((recipe) => (
            <li key={recipe.id}>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
            </li>
            ))} */}
        </ul>
        </div>
    );
}