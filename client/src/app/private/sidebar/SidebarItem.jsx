import { faHome, faUser, faPerson, faDumbbell, faBook, faTableColumns, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

export const SidebarItem = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: faTableColumns
    },
    {
        name: 'Exercises',
        path: '/gym',
        icon: faDumbbell
    },
    {
        name: 'Trainer',
        path: '/trainer',
        icon: faPerson
    },
    {
        name: 'Nutrition Info',
        path: '/nutrition',
        icon: faSearchengin
    },
    {
        name: 'Search Recipe',
        path: '/recipe',
        icon: faMagnifyingGlass
    },
    {
        name: 'Recipe Book',
        path: '/recipebook',
        icon: faBook
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: faUser
    },
]