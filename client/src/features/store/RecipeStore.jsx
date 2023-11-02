import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'

const useRecipeStore = create(
    persist(
        (set) => ({
            searchName: '',
            recipeResults: [],
            recipeData: {
                image: '',
                source: '',
                url: '',
                overallRating: '',
                numRating: '',
                ingredientLines: [],
                totalNutrients: [],
                totalCO2Emissions: '',
                yield: '',
            },
            recipeSelected: false,
            setRecipeSelected: (data) => set({ recipeSelected: data }),
            setSearchName: (data) => set({ searchName: data }),
            setRecipeResults: (data) => set({ recipeResults: [...data] }),
            setRecipeData: (data) => set({ recipeData: {...data} }),
            resetSearchName: () => set({ searchName: '' }),
            resetRecipeResults: () => set({ recipeResults: [] }),
            resetRecipeData: () => set({ recipeData: {} })
        }),
        {
            name: 'recipe-store',
        }
    )
);

export default useRecipeStore;