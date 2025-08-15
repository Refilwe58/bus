import React, { useState } from 'react';
import { MenuIcon, X as CloseIcon, Bell as BellIcon, User as UserIcon, Map as MapIcon, MessageSquare as MessageSquareIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
 // at top of component
const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
const closeTimer = React.useRef<number | null>(null);

const openAccountMenu = () => {
  if (closeTimer.current) {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }
  setIsAccountMenuOpen(true);
};

const closeAccountMenu = () => {
  // small delay prevents flicker
  closeTimer.current = window.setTimeout(() => {
    setIsAccountMenuOpen(false);
  }, 150);
};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-xl cursor-pointer" onClick={() => navigate('/landing')}>
              Tshwane Connect
            </div>
            <div className="text-xs bg-green-500 px-2 py-0.5 rounded-full">
              A Re Yeng
            </div>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate('/landing')} className="hover:text-teal-200 transition-colors">
              Home
            </button>
            {isLoggedIn ? <>
                <button onClick={() => navigate('/dashboard')} className="hover:text-teal-200 transition-colors">
                  Dashboard
                </button>
                <button onClick={() => navigate('/routes')} className="hover:text-teal-200 transition-colors">
                  <MapIcon size={20} />
                </button>
                <button onClick={() => navigate('/topup')} className="hover:text-teal-200 transition-colors">
                  Top Up
                </button>
                <button onClick={() => navigate('/notifications')} className="hover:text-teal-200 transition-colors relative">
                  <BellIcon size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button onClick={() => navigate('/forum')} className="hover:text-teal-200 transition-colors relative">
                  <MessageSquareIcon size={20} />
                </button>
                <div
                className="relative pb-2"               // pb-2 expands the hover zone
                onMouseEnter={openAccountMenu}
                onMouseLeave={closeAccountMenu}
                onFocus={openAccountMenu}
                onBlur={closeAccountMenu}
                tabIndex={0}                            // enables focus-within for keyboard users
              >
                <button className="flex items-center bg-white text-teal-600 px-4 py-1 rounded-md hover:bg-teal-100 transition-colors">
                  <UserIcon size={16} className="mr-1" />
                  Account
                </button>

                <div
                  className={`absolute right-0 top-full w-48 bg-white rounded-md shadow-lg overflow-hidden z-50
                              ${isAccountMenuOpen ? 'block' : 'hidden'}`}
                >
                  <button
                    onMouseDown={(e) => e.preventDefault()} // keep focus so blur doesn't instantly close
                    onClick={() => navigate('/profile')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>



              </> : <button onClick={() => navigate('/login')} className="bg-white text-teal-600 px-4 py-1 rounded-md hover:bg-teal-100 transition-colors">
                Login
              </button>}
            <button onClick={() => navigate('/feedback')} className="hover:text-teal-200 transition-colors">
              Feedback
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 flex flex-col space-y-3 pb-4">
            <button onClick={() => {
          navigate('/landing');
          setIsMenuOpen(false);
        }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
              Home
            </button>
            {isLoggedIn ? <>
                <button onClick={() => {
            navigate('/dashboard');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
                  Dashboard
                </button>
                <button onClick={() => {
            navigate('/routes');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
                  Routes Map
                </button>
                <button onClick={() => {
            navigate('/topup');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
                  Top Up
                </button>
                <button onClick={() => {
            navigate('/notifications');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors flex items-center">
                  Notifications
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button onClick={() => {
            navigate('/forum');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
                  Community Forum
                </button>
                <button onClick={() => {
            navigate('/profile');
            setIsMenuOpen(false);
          }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
                  My Profile
                </button>
                <button onClick={() => {
            onLogout();
            setIsMenuOpen(false);
          }} className="bg-white text-teal-600 py-2 px-2 rounded transition-colors">
                  Logout
                </button>
              </> : <button onClick={() => {
          navigate('/login');
          setIsMenuOpen(false);
        }} className="bg-white text-teal-600 py-2 px-2 rounded transition-colors">
                Login
              </button>}
            <button onClick={() => {
          navigate('/feedback');
          setIsMenuOpen(false);
        }} className="hover:bg-teal-700 py-2 px-2 rounded transition-colors">
              Feedback
            </button>
          </nav>}
      </div>
    </header>;
};