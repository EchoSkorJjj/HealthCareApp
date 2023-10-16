import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'

const useRecipeStore = create(
    persist(
        (set) => ({
            searchName: '',
            recipeResults: [],
            setSearchName: (data) => set({ searchName: data }),
            setRecipeResults: (data) => set({ recipeResults: [...data] }),
            resetSearchName: () => set({ searchName: '' }),
            resetRecipeResults: () => set({ recipeResults: [] }),
        }),
        {
            name: 'recipe-store',
        }
    )
);

export default useRecipeStore;