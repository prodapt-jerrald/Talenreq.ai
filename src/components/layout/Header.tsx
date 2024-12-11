import { User, LogOut, BellRing } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
}

export default function Header({ userName = 'John Doe', avatarUrl }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">TalentReq.AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <BellRing className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {userName.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">{userName}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}