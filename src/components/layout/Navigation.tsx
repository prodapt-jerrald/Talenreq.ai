import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Users, Settings, BarChart } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/candidates', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Navigation() {
  return (
    <nav className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                'transition-colors duration-150 ease-in-out',
                {
                  'bg-primary text-white': isActive,
                  'text-gray-600 hover:bg-gray-50': !isActive,
                }
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}