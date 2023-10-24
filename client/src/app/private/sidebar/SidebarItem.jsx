import { faHome, faWrench, faUser, faPerson, faDumbbell, faBook, faGear, faTableColumns, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

export const SidebarItem = [
    {
        name: 'Home Page',
        path: '/homepage',
        icon: faHome
    },
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
        name: 'Services',
        path: '/services',
        icon: faWrench
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: faUser
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: faGear
    }
]