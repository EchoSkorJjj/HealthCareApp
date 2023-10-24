import { 
    IoChevronForward, 
    IoApps, 
    IoNotifications, 
    IoPieChart, 
    IoNewspaper, 
    IoSearch, 
    IoColorFill,
    IoIdCardOutline} from "react-icons/io5";

export const CardData = [
    {
        title: ['Nutrition', 'Navigator'],
        description: 'Explore a comprehensive guide to managing and optimizing your nutritional intake. From tracking macros to discovering new healthy recipes, the Nutrition Navigator is your go-to resource for a balanced diet.',
        icon: IoSearch,
        iconColor: '#14da8f',
        backgroundColor: '#ddfbf9',
    },
    {
        title: ['Recipe Rendezvous', '& Review'],
        description: 'Discover a world of culinary delights with Recipe Rendezvous & Review. Browse through numerous recipes, share your own culinary creations, and read reviews to find your next favorite meal.',
        icon: IoColorFill,
        iconColor: '#5700cf',
        backgroundColor: '#e7daf8',
    },
    {
        title: ['Wellness', 'Dashboard'],
        description: 'Your personal hub for tracking and managing your wellness journey. With a holistic view of your health metrics and progress over time, the Wellness Dashboard helps you stay on track towards achieving your health goals.',
        icon: IoApps,
        iconColor: '#ff8559',
        backgroundColor: '#ffede6',
    },
    {
        title: ['Personalized', 'Workout Partner'],
        description: "Meet your new workout companion. Receive personalized workout plans, track your progress, and stay motivated with a digital partner who's always ready to help you stay fit and active.",
        icon: IoIdCardOutline,
        iconColor: '#fa3970',
        backgroundColor: '#ffe1e9',
    },
    {
        title: ['Recipe Saver', '& Nutrition Info'],
        description: 'Never lose track of that perfect recipe again with Recipe Saver. Plus, get detailed nutritional information to help you make informed dietary choices.',
        icon: IoNewspaper,
        iconColor: '#56a8f4',
        backgroundColor: '#dcedff',
    },
    {
        title: ['Health Alerts', '& Insights'],
        description: 'Stay informed about your health with real-time alerts and insightful reports. Understand your body better and catch potential issues before they become problems.',
        icon: IoPieChart,
        iconColor: '#06d786',
        backgroundColor: '#dbf9ed',
    },
    {
        title: ['Notification', '& Reminders'],
        description: "Forget forgetting. With timely notifications and reminders, you'll always be on top of your health regimen, appointments, and important health-related tasks.",
        icon: IoNotifications,
        iconColor: '#f1df11',
        backgroundColor: '#fffada',
    },
];