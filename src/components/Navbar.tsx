import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, Menu, X, User, ChevronDown, LogOut, BookOpen, GraduationCap, Compass, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, currentPath, navigate, login, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Explore', path: '/' },
    { label: 'Find Mentors', path: '/mentors' },
    { label: 'Classes', path: '/classes' },
    { label: 'How It Works', path: '/#how-it-works' }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="navbar-brand-logo"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
            <Coffee className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg tracking-tight text-slate-900">
              Pirate<span className="text-indigo-600">Chai</span>
            </span>
            <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Educator Network
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links - Professional Polish Segmented Control */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-md">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  active
                    ? 'bg-white shadow-sm text-indigo-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right side authentication & role quick-switcher */}
        <div className="hidden md:flex items-center gap-3">
          {user.isAuthenticated ? (
            <div className="relative">
              <button
                id="user-menu-button"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer shadow-xs"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight max-w-[120px] truncate">
                    {user.name}
                  </p>
                  <span className="text-[10px] font-semibold text-indigo-600 capitalize">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  id="user-dropdown-menu"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                      Role: {user.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate(user.role === 'educator' ? '/dashboard/educator' : '/dashboard/student');
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      {user.role === 'educator' ? 'Educator Dashboard' : 'Student Dashboard'}
                    </button>

                    {user.role === 'educator' && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/dashboard/educator/profile');
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Edit Teaching Profile
                      </button>
                    )}

                    {user.role === 'educator' && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/dashboard/educator/classes/new');
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        Create New Class
                      </button>
                    )}
                  </div>

                  {/* Switch test persona */}
                  <div className="border-t border-slate-100 px-3.5 py-2 bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Switch Role (Demo)
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          login('student');
                          setUserDropdownOpen(false);
                        }}
                        className={`flex-1 text-[11px] py-1 px-2 rounded font-medium transition cursor-pointer ${
                          user.role === 'student'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={() => {
                          login('educator');
                          setUserDropdownOpen(false);
                        }}
                        className={`flex-1 text-[11px] py-1 px-2 rounded font-medium transition cursor-pointer ${
                          user.role === 'educator'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Educator
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="navbar-login-btn"
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                id="navbar-signup-btn"
                onClick={() => navigate('/signup')}
                className="px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Quick Dashboard link if logged in */}
          {user.isAuthenticated && (
            <button
              id="navbar-dashboard-quick-btn"
              onClick={() =>
                navigate(user.role === 'educator' ? '/dashboard/educator' : '/dashboard/student')
              }
              className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer shadow-xs"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {user.isAuthenticated && (
            <button
              onClick={() =>
                navigate(user.role === 'educator' ? '/dashboard/educator' : '/dashboard/student')
              }
              className="p-1 rounded-md border border-slate-200"
            >
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition cursor-pointer ${
                  isActive(link.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user.isAuthenticated ? (
              <>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">Logged in as {user.role}</p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <button
                      onClick={() => login('student')}
                      className={`flex-1 py-1 text-xs rounded font-semibold ${
                        user.role === 'student' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      Student View
                    </button>
                    <button
                      onClick={() => login('educator')}
                      className={`flex-1 py-1 text-xs rounded font-semibold ${
                        user.role === 'educator' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-700'
                      }`}
                    >
                      Educator View
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(user.role === 'educator' ? '/dashboard/educator' : '/dashboard/student');
                  }}
                  className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white text-sm font-semibold text-center"
                >
                  Open Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 px-4 rounded-md border border-rose-200 text-rose-600 text-xs font-semibold text-center"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2 px-4 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white text-sm font-semibold text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
