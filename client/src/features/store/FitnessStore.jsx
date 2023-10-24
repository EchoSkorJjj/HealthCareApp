import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'

const useFitnessStore = create(
    persist(
        (set) => ({
        hasAccessToken: '',
        fitnessStore: {
            totalSteps: '',
            dailySteps: '',
            weekOffset: '',
            totalDistance: '',
            dailyDistance: '',
            totalCalories: '',
            dailyCalories: '',
            monthlySteps: '',
        }, 
        setAccessToken: (data) => set({ hasAccessToken: data }),
        resetAccessToken: () => set({ hasAccessToken: ''}),
        setFitnessData: (data) => set({ fitnessStore: {...data} }),
        resetFitnessData: () => set({ fitnessStore: {}})
        }),
        {
            name: 'fitness-store',
        }
    )
);

export default useFitnessStore;