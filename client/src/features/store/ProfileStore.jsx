import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'

const useProfileStore = create(
    persist(
        (set) => ({
        profileStore: {
            username: '',
            fullname: '',
            age: '',
            gender: '',
            bio: '',
            email: '',
            profilePicture: '',
        }, 
        setProfileData: (data) => set({ profileStore: {...data} }),
        resetProfileData: () => set({ profileStore: {}})
        }),
        {
            name: 'profile-store',
        }
    )
);
  
export default useProfileStore;